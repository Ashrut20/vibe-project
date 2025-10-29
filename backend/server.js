import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser";
import { dbconnection } from './db.config/db.js';
import product from './routes/product.js'
import checkout from './routes/checkout.js'
import cartRoutes from './routes/cart.js'
dotenv.config();
const port = process.env.PORT|| 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("working fine")
})
dbconnection();



app.use("/api/products", product);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkout);

app.listen(port ,()=>{
    console.log(`app is listening on port ${port}`)
})