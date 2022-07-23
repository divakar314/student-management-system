const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    addressId : {
        type : String,
        required:true
    },
    passYear:{
        type:String,
        required:true
    },
    photo:{
        type:Buffer,
        required:true
    },
    graduationStatus:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    aadhar:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    fatherEduQualification:{
        type:String,
        required:true
    },
    fatherOccupation:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },
    motherEduQualification:{
        type:String,
        required:true
    },
    motherOccupation:{
        type:String,
        required:true
    },
    courseId:{
        type:String,
        required:true
    }
})
studentSchema.index({name:'text'})
module.exports = mongoose.model("Student",studentSchema)