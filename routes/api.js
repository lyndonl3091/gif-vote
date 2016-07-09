"use strict;"

const express = require('express');

let router = express.Router();

router.use('/users', require('./users'));
router.use('/things', require('./things'));
router.use('/twitter', require('./twitter'));

module.exports = router;

