const mongoose = require('mongoose');


const CruiseSchma = mongoose.Schema({
    cruise_name: {
        type: String,
        required: true
    },
    cruise_description: {
        type: String,
        required: true
    },
    cruise_Img: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 1
    },
    address:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: true
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
const Cruise = module.exports = mongoose.model('Cruise', CruiseSchma);