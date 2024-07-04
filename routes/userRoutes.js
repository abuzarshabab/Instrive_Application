const express = require("express")
const router = express.Router()

const { dbInstance } = require('../database/connection')

// TODO: Use Joi validation to validate request params.
// TODO: Save uploaded image in base64 format in database

router.post("", async (req, res, next) => {
  let body = req.body;
  const db = await dbInstance().collection('application');

  await db.insertOne(body);
  res.json({ message: "Post Query"})
})


// TODO: Add pagination
// TODO: Add sorting
// TODO: Add Search Filtering using the fields(company name, country, product name).
router.get("/", async (req, res, next) => {
  
  let query = req.query;
  res.json({ message: "get Query"})

})

module.exports = router;