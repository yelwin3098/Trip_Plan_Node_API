const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');
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

router.get('/',AuthMiddleware ,festivalController.index);

router.post('/', upload.single('festival_Img'), festivalController.create);

router.get('/:id', festivalController.getSingle);

router.patch('/:fest_id',upload.single('festival_Img'), festivalController.updateFest);
router.delete('/:fest_id',festivalController.deleteFest);

module.exports = router;