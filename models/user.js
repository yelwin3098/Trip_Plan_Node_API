const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password:{
        type:String,
        require:true
    },
    fav_status:{
        type: Boolean,
        default: 0
    },
    AtoP_status:{
        type: Boolean,
        default: 0
    }
});

const User = module.exports = mongoose.model('user', UserSchema);