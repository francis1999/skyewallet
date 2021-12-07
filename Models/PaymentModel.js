const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/userModel")


const PaymentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true
    },
    Paymentid: { type: String, unique: true },
}, { timestamps: true })


module.exports = mongoose.model("Payment", PaymentSchema)