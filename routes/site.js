const express = require('express');
const { SiteModel, ValidateSite } = require('../models/siteModel');
const router = express.Router();

router.get("/", async (req, res) => {
  let perPage = Math.min(req.query.perPage, 20) || 4;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  try {
    let data=await SiteModel.find({})
    .limit(perPage)
    .skip((page - 1) * perPage)
    .sort({ [sort]: reverse });
    res.json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err", error })
  }
})
router.get("/:id", async (req, res) => {
  let data = await SiteModel.findOne({ _id: req.params.id });
  res.json(data)
})
router.post("/", async (req, res) => {
  let ValidateBody = ValidateSite(req.body);
  if (ValidateBody.error) {
    return res.status(400).json(ValidateBody.error.details)
  }
  try {
    let site = new SiteModel(req.body);
    await site.save();
    res.status(201).json(site)

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
})
//------------------------------
router.post("/insertMany", async (req, res) => {
  try {
    let sites = Array.isArray(req.body) ? req.body : [req.body];

    for (let site of sites) {
      let validateBody = ValidateSite(site);
      if (validateBody.error) {
        return res.status(400).json(validateBody.error.details);
      }
    }

    let newSites = await SiteModel.insertMany(sites);

    res.status(201).json(newSites);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//------------------------------
router.delete("/:id", async (req, res) => {
  try {
    let delId = req.params.id;
    const data = await SiteModel.findByIdAndDelete(delId);
    res.json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err", error })
  }
})
router.put("/:id", async (req, res) => {
  let validBody = ValidateSite(req.body);
  if (validBody.error) {
    res.status(400).json(validBody.error.details);
    return;
  }
  try {
    let id = req.params.id;
    let data = req.body;
    let result = await SiteModel.updateOne({ _id: id }, data);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There is a problem try again later", err });
  }
});
module.exports = router;