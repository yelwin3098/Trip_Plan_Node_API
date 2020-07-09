const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const AuthMiddleware=require('../middlewares/authMiddleware')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/',restaurantController.index);

router.post('/', upload.single('restaurant_img'), restaurantController.create);

router.get('/:id', restaurantController.getSingle);

router.patch('/:restaurant_id',upload.single('restaurant_img'), restaurantController.updateHotel);
router.delete('/:restaurant_id',restaurantController.deleteHotel);


router.post('/review',AuthMiddleware,restaurantController.submitReview);


module.exports = router;