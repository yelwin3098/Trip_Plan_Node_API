const express = require('express');
const router = express.Router();
const catController = require('../controllers/categoryController');
const AuthMiddleware=require('../middlewares/authMiddleware')


router.get('/',catController.index);

router.post('/',catController.create);
module.exports = router;