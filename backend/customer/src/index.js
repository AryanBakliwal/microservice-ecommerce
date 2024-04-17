require('dotenv').config();
const express = require("express");
const connection = require('./db');
const app = express();
const cors = require('cors');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


connection();

//middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:8001' }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('home');
})

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

//routes
app.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try {
        const userDoc = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if(passOK) {
        jwt.sign({
            email: userDoc.email,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            id: userDoc._id
        }, secret, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                firstName: userDoc.firstName,
                lastName: userDoc.lastName,
                email: userDoc.email,
            });
        });
    } else {
        res.status(400).json('Wrong password!');
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
    
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})

app.listen(8001, () => {
    console.log("Customer is Listening to Port 8001");
  });