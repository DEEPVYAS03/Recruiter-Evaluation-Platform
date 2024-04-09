const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company:{
        type:String
    },
    jobProfile:{
        type:String
    },
    salary:{
        type:Number
    },
    lastDate:{
        type:Date
    },
    jdFile:{
        type:String
    },
    appliedCandidates:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})


module.exports = mongoose.model('Job', jobSchema);