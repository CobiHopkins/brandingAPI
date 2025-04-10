const express = require('express');
const TagController = require('../controllers/tagController');

const jwt = require('../middleware/jwt');

const router = express.Router();

router.get('/', TagController.findAll);
router.post('/', jwt, TagController.createTag);

router.get('/:id', TagController.getById);
router.put('/:id', jwt, TagController.updateTag);
router.delete('/:id', jwt, TagController.deleteTag);

module.exports = router;