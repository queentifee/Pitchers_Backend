const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUser } = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User Controller
 *   description: User 
 */


/**
 * @swagger
 * /api/v1/user/getusers:
 *   get:
 *     summary: Returns a list of all users
 *     description: Fetches and returns a full list of all users
 *     responses:
 *       200:      
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "Oliver Twist"
 *                   email:
 *                     type: string
 *                     example: "oliver@gmail.com"
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */

// Get all users (admin only)
router.get('/getusers', getAllUsers);
/**
 * @swagger
 * /api/v1/user/getuserbyid/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Returns a user with a specific ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *         example: "64f7a9d8a123456"
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 name:
 *                   type: string
 *                   example: "Oliver Twist"
 *                 email:
 *                   type: string
 *                   example: "example@gmail.com"
 */

// Get a single user by ID
router.get('/getuserbyid/:id',getUserById);


/**
 * @swagger
 * /api/v1/user/delete/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     description: Deletes a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *         example: "1"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */


// Delete a user (admin only)
router.delete('/delete/:id', deleteUser);


module.exports = router;
