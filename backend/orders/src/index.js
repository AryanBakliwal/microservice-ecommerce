require('dotenv').config();
const express = require("express");
const connection = require('./db');
const app = express();
const cors = require('cors');
const Order = require('./models/order');

connection();

//middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:8003' }));

app.post('/', async (req, res) => {
    try {
        const { userID } = req.body;
        // Assuming userId is a string, adjust accordingly if it's a different type
        const orders = await Order.find({ customerID: userID });
    
        res.json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.post('/checkout', async (req, res) => {
    const {customerID, extractedItems, total, itemAmount, datenow, timenow} = req.body;
    try {
        const orderDoc = await Order.create({
            customerID,
            items: extractedItems,
            total,
            itemAmount,
            date: datenow,
            time: timenow
        });
        res.status(201).json({ message: 'Order created successfully', order: orderDoc });
    } catch(e) {
        res.status(400).json(e);
    }
});


app.listen(8003, () => {
    console.log("Orders is Listening to Port 8003");
  });