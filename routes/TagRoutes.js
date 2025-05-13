const express = require('express');
const TagController = require('../controllers/tagController');

const router = express.Router();

router.get('/', TagController.findAll);
router.get('/:id', TagController.getById);

module.exports = router;