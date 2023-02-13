const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController')


router.post('/sendMessage', UserController.sendMessage);
router.post('/sendEmail', UserController.sendEmail)

module.exports = router;