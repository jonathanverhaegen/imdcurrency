const express = require('express')
const router =  express.Router();


// GET api/v1/transfers

router.get('/',  (req,res) => {
    res.send("get transfers");
})


//POST api/v1/transfers
router.post('/',  (req,res) => {
    res.send("post transfers");
})

// GET api/v1/transfers/:id
router.get('/:id', (req,res) => {
    res.send("get transfers by id " + req.params.id);
})

module.exports = router;

