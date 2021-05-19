const express = require('express')
const router =  express.Router();
const transfersController = require('../../../controllers/api/v1/transfers')


// GET api/v1/transfers

router.get('/',  transfersController.getAll);

//POST api/v1/transfers
router.post('/',  transfersController.save);

//GET api/v1/transfers/filter

router.get('/filter', transfersController.filterAmount);

// GET api/v1/transfers/:id
router.get('/:id', transfersController.getById);



module.exports = router;