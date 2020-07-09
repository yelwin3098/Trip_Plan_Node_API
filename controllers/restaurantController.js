const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');
const fs = require('fs');

module.exports = {
    index: async(req, res) => {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            'restaurants': restaurants
        });
    },
    create: async(req, res, next) => {
        const files = req.file
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }
        const restaurant = new Restaurant({
            restaurant_name: req.body.restaurant_name,
            food_style:req.body.food_style,
            address: req.body.address,
            phone_no: req.body.phone,
            restaurant_Img: req.file.path,
            city: req.body.city,
            status: req.body.status
        });
        const saveRestaurant = await restaurant.save();
        if (!saveRestaurant) return res.status(400).json('Restaurant create Fail');
        res.status(200).json(saveRestaurant);
    },
    getSingle: async(req, res) => {
        const restaurant_id = req.params.id;
        Restaurant.findById(restaurant_id,{__v:0})
              .populate('comments',{_id:0,commentIsApproved:0,__v:0})
              .populate('city',{city_name:1})
              .then(restaurant=>{
                 res.status(200).json(restaurant)
              });
    },
    updateHotel: (req, res) => {
        const id = req.params.restaurant_id;
        const update = Restaurant.findByIdAndUpdate(id, {
            restaurant_name: req.body.restaurant_name,
            food_style:req.body.food_style,
            address: req.body.address,
            phone_no: req.body.phone,
            restaurant_Img: req.file.path,
            city: req.body.city,
            status: req.body.status
        });
        update.exec(function(err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
    },
    deleteHotel: async(req, res) => {
        const id = req.params.restaurant_id;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not exist' });
        } else {
            await restaurant.remove((err, result) => {
                if (err) {
                    res.status(404).json({ error: 'Restaurant delete fail' });
                } else {
                    fs.unlink(restaurant.restaurant_Img, (err, done) => {
                        if (err) {
                            res.status(404).json({ error: 'Image unlink error' });
                        }
                    });
                    res.status(200).json({ 'success': 'Restaurant Deleted' })
                }
            })
        }
    },
    submitReview: (req, res) => {
        const id = req.body.restaurant_id
        console.log(id)
        Restaurant.findById(id, (err, restaurant) => {
            const newComment = new Comment({
                user: req.body.user,
                body: req.body.comment_body
            });
            restaurant.comments.push(newComment);
            restaurant.save().then(restaurantSave => {
                newComment.save().then(saveComment => {
                    res.status(200).json({ 'success': 'Review Created', 'restaurant': restaurant })
                })
            })
        })

    }
}