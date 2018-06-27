var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');
/* GET users listing. */
router.get('/', userController.getUsers);
router.get('/users',userController.getUsersByParam);
module.exports = router;
