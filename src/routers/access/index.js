const express = require('express');
const { asyncHandler } = require('../../utils/errorHandler');
const accessController = require('../../controllers/access.controller');
const { authentication } = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', asyncHandler(authentication), asyncHandler(accessController.login));

module.exports = router;
