const mongoose = require('mongoose');

const FestivalSchma = mongoose.Schema({
    festival_name: {
        type: String,
        required: true
    },
    festival_description: {
        type: String,
        required: true
    },
    festival_Img: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 1
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
});
const Festival = module.exports = mongoose.model('Festival', FestivalSchma);