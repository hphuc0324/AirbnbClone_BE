const express = require('express');
const router = express.Router();

const { asyncHandler } = require('../../utils/errorHandler');
const hobbyController = require('../../controllers/hobby.controller');

router.get('/', asyncHandler(hobbyController.getAllHobbies));

module.exports = router;
