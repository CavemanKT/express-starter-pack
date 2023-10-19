var express = require('express');
var router = express.Router();

router.post('/signup', require('../controllers/api/auth/signup'))
router.post('/login', require('../controllers/api/auth/login'))

module.exports = router
