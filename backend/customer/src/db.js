require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
    try{
        mongoose.connect(process.env.DB);
        console.log('DB connected!');
    } catch (error) {
        console.log(error);
    }
}