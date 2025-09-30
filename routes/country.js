const express = require('express');
const { auth } = require('../middlewares/auth');
const { UserModel } = require('../models/userModel');
const { CountryModel, ValidateCountry } = require('../models/countryModel');
const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        let countries = await CountryModel.find({ user_id: req.tokenData._id })
        res.json(countries)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err", error })
    }
    res.json({ msg: "country is working" })
})
router.post("/", auth, async (req, res) => {
    let validBody = ValidateCountry(req.body)
    if (validBody.error) {
        // if (validBody.error.details)
            return res.status(400).json(validBody.error.details);
    }
    try {
        let country = new CountryModel({
            name: req.body.name,
            capital: req.body.capital,
            pop: req.body.pop,
            image: req.body.image,
            user_id: req.tokenData._id
        });

        await country.save();
        res.status(201).json(country)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err", error })
    }
})
router.delete("/:id", auth, async (req, res) => {
    // let user_id = req.tokenData._id;
    // let countryId = await CountryModel.findOne({ _id: req.params.id }, { user_id: 1 });
    // console.log(countryId);
    // if (user_id != countryId.user_id) {
    //     return res.status(403).json({ msg: "Forbidden" })
    // }
    try {
        let delId = req.params.id;
        // const data = await CountryModel.findByIdAndDelete(delId);
        const data = await CountryModel.deleteOne({ _id: delId,user_id:req.tokenData._id });
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err", error })
    }
})
router.put("/:id", auth, async (req, res) => {
    delete req.body._id;
    req.body.user_id = req.tokenData._id;
    let validBody = ValidateCountry(req.body);
    if (validBody.error) {
        res.status(400).json(validBody.error.details);
        return;
    }
    let user_id = req.tokenData._id;
    let countryId = await CountryModel.findOne({ _id: req.params.id }, { user_id: 1 });
    if (user_id != countryId.user_id) {
        return res.status(403).json({ msg: "Forbidden" })
    }
    try {
        let id = req.params.id;
        let data = req.body;
        let result = await CountryModel.updateOne(
            { _id: req.params.id },
            { ...validBody.value, date: new Date() }
        );
        res.json(result);
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "There is a problem try again later", err });
    }
})
module.exports = router;