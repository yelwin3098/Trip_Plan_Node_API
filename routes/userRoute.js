const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController');
const authController=require('../controllers/authController');

router.route('/:id')
      .get(userController.getUser)
    
router.route('/')
      .get(userController.getAllUsers)
      .post(userController.signup)

router.route('/login').post(authController.loginAttempt)

router.route('/auth/tokexp').get(authController.checkToken)

module.exports = router;