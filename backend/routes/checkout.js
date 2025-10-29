import express from "express";
import CartItem from "../models/CartItems.js";
import Receipt from "../models/Reciept.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const cart = await CartItem.find().populate("productId");

    if (cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const items = cart.map(c => ({
      name: c.productId.name,
      qty: c.qty,
      price: c.productId.price,
    }));

    const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

    const receipt = await Receipt.create({ items, total, name, email });

    // Clear cart after checkout
    await CartItem.deleteMany();

    res.status(201).json(receipt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
