const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const itemSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const orderSchema = new Schema({
  customerID: {type: String, required: true},
  items: [itemSchema], // Array of product objects
  itemAmount: {type: Number, required: true},
  total: {type: Number,
    required: true
  },
  date: {type: String, required: true},
  time: {type: String, required: true}
  // other fields related to order like user_id, date, etc.
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
