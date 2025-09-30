const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { auth, authAdmin } = require("../middlewares/auth");
const { ValidateUser, UserModel, validateLogin, createToken } = require('../models/userModel');

router.get("/", (req, res) => {
    res.json({ msg: "Users is working" })
})
router.post("/", async (req, res) => {
    let validBody = ValidateUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "**********"
        res.status(201).json(user)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })
        }
        console.log(error);
        res.status(500).json({ msg: "err", error })
    }
})

router.post("/login", async (req, res) => {
    let validBody = validateLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ msg: "password or email is wrong, code: 1" })
        }
        let authPassword = await bcrypt.compare(req.body.password, user.password);
        if (!authPassword) {
            return res.status(401).json({ msg: "Invalid password ,code: 2" })
        }
        let newToken = createToken(user);
        res.json({ token: newToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err", error })
    }
})
router.get("/myEmail", auth, async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { email: 1 });
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err", error })
    }
})
router.get("/myProfile", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.tokenData._id).select("-password -__v");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err", error });
  }
});

router.get('/usersList', authAdmin, async (req, res) => {
    try {
        let data = await UserModel.find({}, { password: 0 });
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error", err });
    }
})

module.exports = router;