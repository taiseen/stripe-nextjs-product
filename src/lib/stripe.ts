import Stripe from 'stripe';

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: "2025-09-30.clover",
});

export default stripe;