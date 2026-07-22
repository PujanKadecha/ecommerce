const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Order",

      required: true,
    },

    gateway: {
      type: String,

      enum: ["stripe"],

      default: "stripe",
    },

    paymentIntentId: {
      type: String,

      required: true,

      unique: true,
    },

    amount: {
      type: Number,

      required: true,

      min: 0,
    },

    currency: {
      type: String,

      default: "usd",

      lowercase: true,
    },

    paymentMethod: {
      type: String,

      default: "card",
    },

    status: {
      type: String,

      enum: [
        "pending",

        "processing",

        "paid",

        "failed",

        "cancelled",

        "refunded",
      ],

      default: "pending",
    },

    receiptUrl: {
      type: String,

      default: "",
    },

    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,

      default: {},
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Payment", paymentSchema);
