const mongoose = require("mongoose")

const invoiceSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    total_fee : {
        type : Number,
        required:true
    },
    paid_amount:{
        type:Number,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    whatsapp_number:{
        type:Number,
        required:true
    },
    courseId:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Invoice",invoiceSchema)