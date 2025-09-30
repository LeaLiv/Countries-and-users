const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

exports.auth = (req, res, next) => {
    let token = req.header("x-api-key")
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this endpoint url" })
    }
    try {
        let tokenData = jwt.verify(token, config.tokenSecret)
        req.tokenData = tokenData
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" })
    }
}

exports.authAdmin = (req, res, next) => {
    let token = req.header("x-api-key")
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this endpoint url" })
    }
    try {
        let tokenData = jwt.verify(token, config.tokenSecret)        
        if (tokenData.role !== "admin") {
            return res.status(403).json({ msg: "Forbidden" })
        }
        req.tokenData = tokenData
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" })
    }

}