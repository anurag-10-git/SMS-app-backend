const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController')


router.post('/sendMessage', UserController.userLogin);


module.exports = router;