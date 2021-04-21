
const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        from: "jonathan",
        to: "stijn",
        text: "hier is 5 imdcoin"
    })
  })

  router.get('/:id', (req, res) => {
      let id= req.params.id;
    res.json({
        from: "jonathan",
        to: "stijn",
        text: `hier is 5 imdcoin with ${id}`
    })
  })

  module.exports = router;