const express = require('express')
const router =  express.Router();
const authController = require('../../../controllers/api/v1/auth');
const transfersController = require('../../../controllers/api/v1/transfers');



router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/leaderboard", transfersController.leaderboard);

module.exports = router;
