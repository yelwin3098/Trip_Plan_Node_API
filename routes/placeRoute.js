const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
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

router.get('/',placeController.index);

router.post('/', upload.single('place_img'), placeController.create);

router.get('/:id', placeController.getSingle);

router.patch('/:place_id',upload.single('place_img'), placeController.updatePlace);
router.delete('/:place_id',placeController.deletePlace);


router.post('/review',AuthMiddleware,placeController.submitReview);


module.exports = router;