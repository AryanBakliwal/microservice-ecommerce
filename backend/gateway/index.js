const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:8000' }));
app.use(express.json());

app.use("/customer", proxy("http://localhost:8001"));
app.use("/orders", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8002")); //products

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});