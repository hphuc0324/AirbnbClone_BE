const express = require('express');
const { asyncHandler } = require('../../utils/errorHandler');
const { authentication } = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');
const router = express.Router();

router.get('/me', asyncHandler(authentication), asyncHandler(userController.getPersonalInfo));

module.exports = router;