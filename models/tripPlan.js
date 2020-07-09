const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    plan_name: {
        type: String,
        require: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

const Plan = module.exports = mongoose.model('plan', PlanSchema);