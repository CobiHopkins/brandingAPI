const express = require('express');
const TagController = require('../controllers/tagController');

const router = express.Router();

router.get('/', TagController.findAll);
router.post('/', TagController.createTag);

router.get('/:id', TagController.getById);
router.put('/:id', TagController.updateTag);
router.delete('/:id', TagController.deleteTag);

module.exports = router;