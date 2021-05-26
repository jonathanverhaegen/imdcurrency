const express = require('express')
const router =  express.Router();
const authController = require('../../../controllers/api/v1/auth');
const transfersController = require('../../../controllers/api/v1/transfers');
const userController = require('../../../controllers/api/v1/users');

router.get("/", userController.getAll);
router.get("/user", userController.getUser);
router.get("/leaderboard", transfersController.leaderboard);
router.get("/firstname/:firstname", userController.getUserByFirstname);
router.get("/:id",userController.getUserById);




module.exports = router;
