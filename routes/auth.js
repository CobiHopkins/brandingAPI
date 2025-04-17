const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const basic = require('../middleware/basic');

router.post('/login', basic, authController.login);

module.exports = router;