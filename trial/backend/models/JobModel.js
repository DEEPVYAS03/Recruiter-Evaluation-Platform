const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobCardSchema = new Schema({
    title:{
        type:String,
    },
    skills:{
        type: [String],
        set: skills => skills.split(',').map(skill => skill.trim())
    },
    location:{
        type:String,
    },
    salary:{
        type:Number,
    },
    description:{
        type:String,
    }
    
});

module.exports = mongoose.model('Jobdata', JobCardSchema);