const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    let token = req.header("x-api-key")
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this endpoint url" })
    }
    try {
        let tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY )
        req.tokenData = tokenData
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" })
    }
}