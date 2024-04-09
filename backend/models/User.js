const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    linkedin:{
        type:String
    },
    resumepdf:{
        type:String
    },
    skills:{
        type:Array
    },
    recommskills:{
        type:Array
    },
    tips:{
        type:Array
    },
    rank1:{
        type:Number
    },
    rank2:{
        type:Number
    },
    match1:{
        type:Array
    },
    match2:{
        type:Array
    },
    unmatch1:{
        type:Array
    },
    unmatch2:{
        type:Array
    }
})

module.exports = mongoose.model('User', userSchema);