const express = require('express');
const router = express.Router();
const { submitContactForm } = require ('../controllers/contactUsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - project_description
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the contact person
 *         lastName:
 *           type: string
 *           description: Last name of the contact person
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the contact person
 *         project_description:
 *           type: string
 *           description: Description of the project or inquiry
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@example.com
 *         project_description: E-commerce Website
 */

/**
 * @swagger
 * /api/v1/contactUs/submit-contact-form:
 *   post:
 *     summary: Submit a contact form
 *     tags: 
 *       - Contact
 *     description: Submits a contact form with user details and project information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact form submitted successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Failed to submit contact form
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to submit contact form"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.post('/submit-contact-form', submitContactForm);

module.exports = router;
