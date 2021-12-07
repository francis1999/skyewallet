const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Payment = require("../Models/PaymentModel");

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String },
    /*  payment_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: Payment,
         index: true,
         default: "98798uhuhbkj"
     } */
}, { timestamps: true })

/* UserSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        paymentId: this.paymentId

    }, process.env.SECRET_KEY, { expiresIn: "7d" });
    return token;
} */

module.exports = mongoose.model("User", UserSchema)