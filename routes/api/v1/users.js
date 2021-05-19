const express = require('express')
const router =  express.Router();
const authController = require('../../../controllers/api/v1/auth');
const transfersController = require('../../../controllers/api/v1/transfers');
const userController = require('../../../controllers/api/v1/users');


router.get("/", userController.getUser);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/leaderboard", transfersController.leaderboard);
router.get("/:id",userController.getUserById);



module.exports = router;
