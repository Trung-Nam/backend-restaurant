const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// middleware
const whitelist = [
  'http://localhost:5173', 
  ''
];
app.use(cors({
  origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));
app.use(express.json());

// mongodb configuration using mongoose

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    console.log("MongoDB Connected Successfully!")
  )
  .catch((error) => console.log("Error connecting to MongoDB", error));


// jwt authentication
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr'
  })
  res.send({ token });
})

//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes')
const paymentRoutes = require('./api/routes/paymentRoutes')
const favoritesRoutes = require('./api/routes/favoritesRoutes');
app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/favorites', favoritesRoutes);


app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Hello Food Restaurant Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
