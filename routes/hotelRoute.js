const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
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

router.get('/',hotelController.index);

router.post('/', upload.single('hotel_img'), hotelController.create);

router.get('/:id', hotelController.getSingle);

router.patch('/:hotel_id',upload.single('hotel_img'), hotelController.updateHotel);
router.delete('/:hotel_id',hotelController.deleteHotel);


router.post('/review',AuthMiddleware,hotelController.submitReview);


module.exports = router;