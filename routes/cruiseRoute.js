const express = require('express');
const router = express.Router();
const cruiseController = require('../controllers/cruiseController');
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

router.get('/',cruiseController.index);

router.post('/', upload.single('cruise_Img'), cruiseController.create);

router.get('/:id', cruiseController.getSingle);

router.patch('/:cru_id',upload.single('cruise_Img'), cruiseController.updateCru);
router.delete('/:cru_id',cruiseController.deleteCru);


router.post('/review',AuthMiddleware,cruiseController.submitReview);


module.exports = router;