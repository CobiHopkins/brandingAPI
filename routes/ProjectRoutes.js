const express = require('express');
const ProjectController = require('../controllers/ProjectController');

const router = express.Router();

router.get('/', ProjectController.findAll);
router.get('/:id', ProjectController.getById);
router.get('/:id/tags', ProjectController.findProjectTags);

module.exports = router;