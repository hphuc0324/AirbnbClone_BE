const express = require('express');
const { asyncHandler } = require('../../utils/errorHandler');
const profileFieldController = require('../../controllers/profileField.controller');
const { authentication } = require('../../middlewares/auth');
const router = express.Router();

router.get('/', asyncHandler(profileFieldController.getAllProfileFields));

module.exports = router;
