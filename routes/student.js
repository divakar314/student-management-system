const express = require("express")

const Student = require("../models/students")

const router = express.Router();


router.post("/addStudent", async (req, res) => {
    try {
        if (req.isAuth) {
            if (req.admin) {
                const data = await Student.create({
                    name: req.body.name,
                    addressId: req.body.addressId,
                    passYear: req.body.passYear,
                    photo: req.body.photo,
                    graduationStatus: req.body.graduationStatus,
                    gender: req.body.gender,
                    dob: req.body.dob,
                    nationality: req.body.nationality,
                    emailId: req.body.emailId,
                    aadhar: req.body.aadhar,
                    mobile: req.body.mobile,
                    fatherName: req.body.fatherName,
                    fatherEduQualification: req.body.fatherEduQualification,
                    fatherOccupation: req.body.fatherOccupation,
                    motherName: req.body.motherName,
                    motherEduQualification: req.body.motherEduQualification,
                    motherOccupation: req.body.motherOccupation,
                    courseId: req.body.courseId
                })
                res.send(data)
            }
            else {
                res.send("Not authorized")
            }

        }
        else {
            res.send("please login")
        }

    }
    catch (err) {
        res.send(err)
    }

})

router.get("/student/:studentId", async (req, res) => {
    try {
        if (req.isAuth) {
            const studentInvoice = await Student.find({_id:req.params.studentId});
            res.send(studentInvoice)
        }
        else {
            res.send("please login")
        }
    }
    catch (err) {
        res.send("not added")
    }
})



module.exports = router