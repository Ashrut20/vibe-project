import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


router.get("/seed", async (req, res) => {
  const count = await Product.countDocuments();
  if (count > 0) return res.json({ message: "Already seeded" });

  const mock = [
    { name: "T-shirt", price: 499, description: "Cool cotton tee", image: "https://res.cloudinary.com/dpzpsbhsi/image/upload/v1761660196/pexels-vie-studio-8148577_mdqnvh.jpg" },
    { name: "Jeans", price: 999, description: "Denim jeans", image: "https://res.cloudinary.com/dpzpsbhsi/image/upload/v1761660197/pexels-miyatavictor-1957154_lxzdja.jpg" },
    { name: "Sneakers", price: 1499, description: "Running shoes", image: "https://res.cloudinary.com/dpzpsbhsi/image/upload/v1761660202/pexels-melvin-buezo-1253763-2529148_jxwnrs.jpg" },
    { name: "Backpack", price: 899, description: "Stylish backpack", image: "https://res.cloudinary.com/dpzpsbhsi/image/upload/v1761660198/pexels-pixabay-532803_q7roax.jpg" },
    { name: "Cap", price: 299, description: "Casual cap", image: "https://res.cloudinary.com/dpzpsbhsi/image/upload/v1761660196/pexels-vie-studio-8148577_mdqnvh.jpg" },
  ];
  await Product.insertMany(mock);
  res.json({ message: " Mock products seeded" });
});


router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;
