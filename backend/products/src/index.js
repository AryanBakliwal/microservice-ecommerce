require('dotenv').config();
const express = require("express");
const connection = require('./db');
const app = express();
const cors = require('cors');
const Product = require('./models/product');

connection();

//middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:8002' }));

app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);

    } catch (e) {
        
        console.e('Error fetching products:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.post('/new', async (req, res) => {
    const {id, title, price, description, category, image, rating} = req.body;
    try {
        const productDoc = await Product.create({
            id,
            title,
            price,
            description,
            category,
            image,
            rating
        });
        res.status(201).json(productDoc);
    } catch(e) {
        res.status(400).json(e);
    }
});


app.listen(8002, () => {
    console.log("Customer is Listening to Port 8002");
  });