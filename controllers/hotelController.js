const Hotel = require('../models/hotel');
const Comment = require('../models/comment');
const fs = require('fs');

module.exports = {
    index: async(req, res) => {
        const hotels = await Hotel.find();
        res.status(200).json({
            'hotels': hotels
        });
    },
    create: async(req, res, next) => {
        const files = req.file
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }
        const hotel = new Hotel({
            hotel_name: req.body.hotel_name,
            address: req.body.address,
            phone_no: req.body.phone,
            hotel_Img: req.file.path,
            city: req.body.city,
            status: req.body.status
        });
        const saveHotel = await hotel.save();
        if (!saveHotel) return res.status(400).json('Hotel create Fail');
        res.status(200).json(saveHotel);
    },
    getSingle: async(req, res) => {
        const hotel_id = req.params.id;
        Hotel.findById(hotel_id,{__v:0})
              .populate('comments',{_id:0,commentIsApproved:0,__v:0})
              .populate('city',{city_name:1})
              .then(hotel=>{
                 res.status(200).json(hotel)
              });
    },
    updateHotel: (req, res) => {
        const id = req.params.hotel_id;
        const update = Hotel.findByIdAndUpdate(id, {
            hotel_name: req.body.hotel_name,
            address: req.body.address,
            phone_no: req.body.phone,
            hotel_Img: req.file.path,
            city: req.body.city,
            status: req.body.status
        });
        update.exec(function(err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
    },
    deleteHotel: async(req, res) => {
        const id = req.params.hotel_id;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            res.status(404).json({ error: 'Hotel not exist' });
        } else {
            await hotel.remove((err, result) => {
                if (err) {
                    res.status(404).json({ error: 'Hotel delete fail' });
                } else {
                    fs.unlink(hotel.hotel_Img, (err, done) => {
                        if (err) {
                            res.status(404).json({ error: 'Image unlink error' });
                        }
                    });
                    res.status(200).json({ 'success': 'Hotel Deleted' })
                }
            })
        }
    },
    submitReview: (req, res) => {
        const id = req.body.hotel_id
        console.log(id)
        Hotel.findById(id, (err, hotel) => {
            const newComment = new Comment({
                user: req.body.user,
                body: req.body.comment_body
            });
            hotel.comments.push(newComment);
            hotel.save().then(hotelSave => {
                newComment.save().then(saveComment => {
                    res.status(200).json({ 'success': 'Review Created', 'hotels': hotel })
                })
            })
        })

    }
}