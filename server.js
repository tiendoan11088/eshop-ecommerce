import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';

import stripeModule from 'stripe';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4242;
const stripe = stripeModule(process.env.STRIPE_PRIVATE_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to eshop website.');
});

const array = [];
const calculateOrderAmount = (items) => {
  items.map((item)=> {
    const {price, cartQuantity} = item;
    const cartItemAmount = price*cartQuantity;
    return array.push(cartItemAmount)
  });
  const totalAmount = array.reduce((a,b)=> {
    return a+b;
  },0)
  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone
    },
    // receipt_email: customerEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});





app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));