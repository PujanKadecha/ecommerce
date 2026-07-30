const Stripe = require("stripe");
const env = require("../config/env");

const stripe = new Stripe(env.stripe);

module.exports = stripe;