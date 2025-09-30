const mongoose = require("mongoose");
const joi = require("joi")
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date_created: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user"
    }
})

exports.UserModel = mongoose.model("users", userSchema);

exports.createToken = (user) => {
    let token = jwt.sign({ _id: user._id, role:user.role }, config.tokenSecret, { expiresIn: "60mins" })
    return token;
}

exports.ValidateUser = (_reqBody) => {
    let joiSchema = joi.object({
        name: joi.string().min(2).max(99).required(),
        email: joi.string().min(2).max(99).email().required(),
        password: joi.string().min(6).max(99).required(),
         role: joi.string().valid("user", "admin", "editor").default("user")
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