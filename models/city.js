const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CitySchema=new Schema({
    city_name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    city_Img: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 1
    },
    });

const City = module.exports = mongoose.model('city', CitySchema);