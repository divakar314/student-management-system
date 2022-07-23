const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    doorNo : {
        type : String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    landMark:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model("Address",addressSchema)