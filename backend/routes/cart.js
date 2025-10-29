import express from "express";
import CartItem from "../models/CartItems.js";
import Product from "../models/Product.js";

const router = express.Router();

// Addtocart
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!productId)
      return res.status(400).json({ error: "productId is required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let existing = await CartItem.findOne({ productId });

    if (existing) {
      
      existing.qty += Number(qty) || 1;

      
      if (existing.qty <= 0) {
        await existing.deleteOne();
        return res.json({ message: "Item removed from cart (qty 0)" });
      }

      await existing.save();
      return res.json(existing);
    }

    
    const newItem = await CartItem.create({
      productId,
      qty: Number(qty) || 1,
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error in POST /api/cart:", err.message);
    res.status(500).json({ error: err.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const cart = await CartItem.find().populate("productId");
    const total = cart.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    res.json({ cart, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
