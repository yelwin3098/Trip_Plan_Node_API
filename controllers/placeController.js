const Place = require('../models/place');
const Comment = require('../models/comment');
const User = require('../models/user');
const fs = require('fs');

module.exports = {
    index: async(req, res) => {
        const places = await Place.find();
        res.status(200).json({
            'places': places
        });
    },
    create: async(req, res, next) => {
        const files = req.file
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }
        const place = new Place({
            place_name: req.body.place_name,
            place_description: req.body.place_description,
            place_Img: req.file.path,
            city: req.body.city,
            category: req.body.category,
            status: req.body.status
        });
        const savePlace = await place.save();
        if (!savePlace) return res.status(400).json('Place create Fail');
        res.status(200).json(savePlace);
    },
    getSingle: async(req, res) => {
        const place_id = req.params.id;
        Place.findById(place_id,{__v:0})
              .populate('comments',{_id:0,commentIsApproved:0,__v:0})
              .populate('city',{city_name:1})
              .populate('category',{name:1})
              .then(place=>{
                 res.status(200).json(place)
              });
    },
    updatePlace: (req, res) => {
        const id = req.params.place_id;
        const update = Place.findByIdAndUpdate(id, {
            place_name: req.body.place_name,
            place_description: req.body.place_description,
            place_Img: req.file.path,
            city: req.body.city,
            category: req.body.category,
            status: req.body.status
        });
        update.exec(function(err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
    },
    deletePlace: async(req, res) => {
        const id = req.params.place_id;
        const place = await Place.findById(id);
        if (!place) {
            res.status(404).json({ error: 'Place not exist' });
        } else {
            await place.remove((err, result) => {
                if (err) {
                    res.status(404).json({ error: 'Place delete fail' });
                } else {
                    fs.unlink(place.place_Img, (err, done) => {
                        if (err) {
                            res.status(404).json({ error: 'Image unlink error' });
                        }
                    });
                    res.status(200).json({ 'success': 'Place Deleted' })
                }
            })
        }
    },
    submitReview: (req, res) => {
        const id = req.body.place_id
        console.log(id)
        Place.findById(id, (err, place) => {
            const newComment = new Comment({
                user: req.body.user,
                body: req.body.comment_body
            });
            place.comments.push(newComment);
            place.save().then(savePlace => {
                newComment.save().then(saveComment => {
                    res.status(200).json({ 'success': 'Review Created', 'places': place })
                })
            })
        })

    }
}