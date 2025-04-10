const express = require('express');
const projectController = require('../controllers/projectController');
const jwt = require('../middleware/jwt');

const router = express.Router();

router.get('/', projectController.findAll);
router.post('/', jwt, projectController.createProject);

router.get('/:id', projectController.getById);
router.put('/:id', jwt, projectController.updateProject);
router.delete('/:id', jwt, projectController.deleteProject);

router.get('/:id/tags', projectController.findProjectTags);
router.post('/:id/tags', jwt, projectController.addProjectTags);

module.exports = router;