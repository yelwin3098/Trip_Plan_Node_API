const mongoose = require('mongoose');


const RestaurantSchma = mongoose.Schema({
    restaurant_name: {
        type: String,
        required: true
    },
    food_style:{
        type: String,
        required:true,
        default:""
    },
    address:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: true
    },
    restaurant_Img: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 1
    },
    city:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'city'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
});
const Restaurant = module.exports = mongoose.model('restaurant',RestaurantSchma);