const express = require('express');
const authUser = require("../utils/middelware")
const router = express.Router();
const {getCurrentUser , getUserById}  = require("../controllers/userController")
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: Username
 */
router.get("/me", authUser ,getCurrentUser)
router.get("/get-user/:id" ,authUser, getUserById)

module.exports = router