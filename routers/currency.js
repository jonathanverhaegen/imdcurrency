
const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currency");


router.get('/', currencyController.getAll);

router.get('/:id', currencyController.getOneById);

module.exports = router;