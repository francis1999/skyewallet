const { Schema, model } = require("mongoose")
const jwt = require("jsonwebtoken");

module.exports.User = model('User', Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
        }
    },
    number: { type: Number, required: true, unique: true },
    password: { type: String },
    paymentId: { type: String }
}, { timestamps: true }))

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        paymentId: this.paymentId

    }, process.env.SECRET_KEY, { expiresIn: "7d" });
    return token;
}