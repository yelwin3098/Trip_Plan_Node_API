const mongoose = require('mongoose');


const HotelSchma = mongoose.Schema({
    hotel_name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: true
    },
    hotel_Img: {
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
const Hotel = module.exports = mongoose.model('hotel',HotelSchma);