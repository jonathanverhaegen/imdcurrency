const express = require("express");
const router = express.Router();

router.post("/:name",(req,res) => {
    let name = req.params.name;

    res.json({
        user: name,
        message: `made new user ${name}`
    })
  })