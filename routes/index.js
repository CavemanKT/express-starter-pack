var express = require('express');
var router = express.Router();
const { getUserByToken } = require('../controllers/_helpers/index')

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.use('/auth', getUserByToken, require('./auth'))

module.exports = router;
