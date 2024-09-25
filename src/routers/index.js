const express = require('express');

const router = express.Router();

router.get('/healthcheck', (req, res) => res.sendStatus(200));

router.use('/auth', require('./access'));
router.use('/user', require('./user'));
router.use('/tags', require('./tags'));

router.use('/', (req, res) => res.status(404).json('No API route found'));

module.exports = router;
