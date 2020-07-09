const mongoose = require('mongoose');


const PlaceSchma = mongoose.Schema({
    place_name: {
        type: String,
        required: true
    },
    place_description: {
        type: String,
        required: true
    },
    place_Img: {
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
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'category'
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
const Place = module.exports = mongoose.model('place',PlaceSchma);