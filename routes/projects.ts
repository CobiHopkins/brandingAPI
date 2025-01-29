const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

router.get('/', projectController.findAll);
router.post('/', projectController.createProject);

router.get('/:id', projectController.getById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;