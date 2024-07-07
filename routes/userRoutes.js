const express = require("express")
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const dbInstance = require('../database/connection')

// TODO: Use Joi validation to validate request params.
// TODO: Save uploaded image in base64 format in database

router.post("", upload.single("logo"), async (req, res, next) => {
  try {
    let payload = JSON.parse(req.body.json);
    const application = await dbInstance().collection('application');
    let result = await application.insertOne(payload);

    if (!result.insertedId) {
      res.json({  message: "Someting is wrong" }).status(409);
    }

    res.json({ message: "Application submitted successfully" }).status(201);
  } catch (error) {
    console.log("Error while inserting application", error);
    res.status(500).json({ error: "Error while inserting application", message: error.message })
  }
})


// TODO: Add pagination
// TODO: Add sorting
// TODO: Add Search Filtering using the fields(company name, country, product name).
router.get("", async (req, res, next) => {
  const pageSize = 10;
  const skip = (req.query.page || 1) * pageSize;

  const application = await dbInstance().collection('application');

  let result = await application.aggregate([
    {
      $skip: skip,
    },
    {
      $limit: pageSize,
    }
  ]).toArray()

  if (!result) {
    res.status(409).json({  message: "Someting is wrong" })
  }
  let query = req.query;
  res.json({ message: "Data fetched sucessfully", data: result })

})

module.exports = router;