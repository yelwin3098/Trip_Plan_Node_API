const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        require: true
    }
});

const Category = module.exports = mongoose.model('category', CategorySchema);