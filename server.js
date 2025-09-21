// server.js
require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. CREATE ORDER API
app.post('/create-order', async (req, res) => {
    try {
        // IMPORTANT: In a real application, you should calculate the amount on the server
        // based on the cart items to prevent price manipulation.
        const { amount, currency = 'INR', receipt } = req.body;

        const options = {
            amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send('Error creating order');
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// 2. VERIFY PAYMENT API (using Webhooks)
app.post('/verify-payment', (req, res) => {
    const secret = 'YOUR_WEBHOOK_SECRET'; // Set this in your Razorpay dashboard

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('Payment is legitimate');
        // This is the ideal place to update your database with payment success.
        // req.body.payload.payment.entity contains payment details
        res.json({ status: 'ok' });
    } else {
        res.status(403).json({ status: 'error', message: 'Invalid signature' });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});