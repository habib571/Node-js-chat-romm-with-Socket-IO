const express = require('express');
const authUser = require("../utils/middelware")
const router = express.Router();
const {getCurrentUser , getUserById}  = require("../controllers/userController")

router.get("/me", authUser ,getCurrentUser)
router.get("/get-user/:id" ,authUser, getUserById)

module.exports = router