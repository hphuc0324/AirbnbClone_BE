const express = require('express');
const { asyncHandler } = require('../../utils/errorHandler');
const accessController = require('../../controllers/access.controller');
const { authentication } = require('../../middlewares/auth');

const router = express.Router();

router.post('/signIn', asyncHandler(authentication), asyncHandler(accessController.signIn));
router.post('/signUp', asyncHandler(authentication), asyncHandler(accessController.signUp));

module.exports = router;
