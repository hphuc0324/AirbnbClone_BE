const express = require('express');
const { asyncHandler } = require('../../utils/errorHandler');
const { authentication } = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');
const router = express.Router();

const { uploadUser } = require('../../configs/config.multer');

router.get('/me', asyncHandler(authentication), asyncHandler(userController.getPersonalInfo));
router.put('/me', asyncHandler(authentication), asyncHandler(userController.updatePersonalInfo));

router.put(
    '/profile/:uid/avatar',
    asyncHandler(authentication),
    uploadUser.single('user-avatar'),
    asyncHandler(userController.updateUserAvatar),
);

router.put(
    '/profile/:uid/description',
    asyncHandler(authentication),
    asyncHandler(userController.updateUserDescription),
);

router.get('/profile/:uid', asyncHandler(userController.getUserProfile));
router.put('/profile/:uid', asyncHandler(authentication), asyncHandler(userController.updateUserProfile));

module.exports = router;
