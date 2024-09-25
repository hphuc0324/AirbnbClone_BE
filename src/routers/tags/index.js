const express = require('express');
const { asyncHandler } = require('../../utils/errorHandler');
const tagsController = require('../../controllers/tags.controller');

const router = express.Router();

router.get('/', asyncHandler(tagsController.getAllTags));

module.exports = router;
