var express = require('express');
var router = express.Router();
const { getUserByToken } = require('../controllers/_helpers/index')


router.use('/auth', getUserByToken, require('./auth'))

module.exports = router;
