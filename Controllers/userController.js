const User = require("../Models/userModel");
const Payment = require("../Models/PaymentModel");
const Validator = require('fastest-validator');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const otpGenerator = require('otp-generator');


module.exports.userregistration = async (req, res) => {
    const schema = {
        password: { type: "string", optional: false, max: "100", empty: false, },
        name: { type: "string", optional: false, empty: false, },
        number: { type: "string", optional: false, empty: false },
        email: { type: "string", optional: false, empty: false },

    }
    const v = new Validator();
    const validationResponse = v.validate(req.body, schema)
    if (validationResponse !== true) {
        return res.status(404).json({
            message: "Validation is Required",
            errors: validationResponse
        })
    }
    const { email } = req.body
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(401).json("Email Already Exist");
        }
        const newUser = new User({
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORDECRPY).toString(),
        })

        try {
            const saveUser = newUser.save();

            res.status(201).json({
                message: "Success",
                data: newUser
            })
            const paymentidentity = new Payment({
                user_id: newUser._id,
                Paymentid: otpGenerator.generate(7, { digits: true, upperCaseAlphabets: true, specialChars: false })

            })
            const enter = paymentidentity.save();
            console.log(paymentidentity)
        } catch (err) {
            res.status(500).json(err)
        }



    })
}

module.exports.authlogin = async (req, res) => {
    try {
        const user = await AdminAuth.findOne({ email: req.body.email })
        !user && res.status(401).json("Wrong Email")
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORDECRPY
        );
        const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalpassword !== req.body.password &&
            res.status(401).json("Invalid Password");

        //accesstoken generator
        const accessToken = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.SECRETK, { expiresIn: "1d" });

        const { password, ...others } = user._doc;
        res.status(200).json({
            message: "You have successfully Logged in",
            data: { ...others, accessToken }
        })

    } catch (err) {
        res.status(500).json("Opps!!! Something Went Wrong");
    }
}