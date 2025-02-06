const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.findAll);
router.post('/', projectController.createProject);

router.get('/:id', projectController.getById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

router.get('/:id/tags', projectController.findProjectTags);
router.post('/:id/tags', projectController.addProjectTags);

module.exports = router;