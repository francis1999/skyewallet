const User = require("../Models/userModel");
const Payment = require("../Models/PaymentModel");
const Validator = require('fastest-validator');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const otpGenerator = require('otp-generator');



// This line of code is use to generate Payment ID 
module.exports.paymentgenerate = async (req, res) => {
    const schema = {
        user_id: { type: "string", optional: false, max: "100", empty: false, },

    }
    const v = new Validator();
    const validationResponse = v.validate(req.body, schema)
    if (validationResponse !== true) {
        return res.status(404).json({
            message: "Validation is Required",
            errors: validationResponse
        })
    }
    const { user_id } = req.body
    const paymentsID = await Payment.find({
        user_id: req.body.user_id
    });
    Payment.findOne({ user_id }).exec((err, user) => {
        if (paymentsID.length === 5) {
            return res.status(429).json("You have Exceeded The Number of PaymentID You can Generate");
        } else {
            console.log(user.user_id)
            const paymentidentity = new Payment({
                user_id: req.body.user_id,
                Paymentid: otpGenerator.generate(7, { digits: true, upperCaseAlphabets: true, specialChars: false })
            })
            try {
                const saveUser = paymentidentity.save();
                res.status(201).json({
                    message: "Payment ID generated Successfully",
                    data: paymentidentity
                })
            } catch (err) {
                res.status(500).json(err)
            }
        }

    })
}


module.exports.Deletepaymentgenerate = async (req, res) => {

    try {
        await Payment.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Payment ID Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
}


module.exports.searchPaymentID = async (req, res) => {
    let query = {};

    const { Paymentidpage } = req.body
    const Paymentid = await Payment.find({
        Paymentid: req.body.Paymentid
    });

    Payment.findOne({ Paymentid }).exec((err, user) => {
        try {

            if (req.query.Paymentid) {
                query.$or = [
                    { "Paymentid": { $regex: req.query.Paymentid } },
                ]
                let diplayPaymentID = Payment.find(query)
                    .populate('user_id')
                return res.status(200).json({
                    message: "success",
                    data: {
                        data: diplayPaymentID,
                    }
                })
            }
        } catch {
            return res.status(404).json("User not found");
        }

    })
}
