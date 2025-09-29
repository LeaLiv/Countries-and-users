const mongoose = require("mongoose");
const joi = require("joi")
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date_created: {
        type: Date,
        default: Date.now()
    }
})

exports.UserModel = mongoose.model("users", userSchema);

exports.createToken = (user_id) => {
    let token = jwt.sign({ _id: user_id }, process.env.JWT_SECRET_KEY, { expiresIn: "60mins" })
    return token;
}

exports.ValidateUser = (_reqBody) => {
    let joiSchema = joi.object({
        name: joi.string().min(2).max(99).required(),
        email: joi.string().min(2).max(99).email().required(),
        password: joi.string().min(6).max(99).required()
    })
    return joiSchema.validate(_reqBody)
}

exports.validateLogin = (_reqBody) => {
    let joiSchema = joi.object({
        email: joi.string().min(2).max(99).email().required(),
        password: joi.string().min(6).max(99).required()
    })
    return joiSchema.validate(_reqBody)
}