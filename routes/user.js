const express = require("express")

const User = require("../models/user");
const Course = require("../models/course");

const router =express.Router()

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

router.get("/",async (req,res) => {
    console.log(req.isAuth);
    if(req.isAuth) {
        const data = await User.findById(req.userId);
        res.send(data);
    }
    else {
        res.send("Please Login")
    }
});

router.post("/user", async(req,res) => {
    try{
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password,salt)
        const user = await User.find({email:req.body.email})
        if(user.length > 0){
            res.send("Email already Registered");
            return;
        }
        const data = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                admin: false,
                password: password
        })
        res.send(data);
        }
    catch(err) {
            console.log(err);
        }
})

router.post("/signin", async (req,res) => {
    try{
        const user = await User.find({email:req.body.email});
        if(user.length == 0 ) {
            res.send("wrong email");
            return;
        }
        const password = user[0].password;
        const checkPass = await bcrypt.compare(req.body.password,password);
        console.log(checkPass);
        if(checkPass) {
            const token = jwt.sign({
                userid: user[0]._id,
                email: user[0].email,
                admin: user[0].admin
            },"qwerty!@#$",{expiresIn: "5days"})
            res.send({token});
            return;
        }
        else {
            res.send("Wrong Password")
        }
    }
    catch(err) {
        res.send(err);
    }
})

router.post("/updatePassword", async (req,res) => {
    try {
        if(req.isAuth) {
            const salt = await bcrypt.genSalt();
            const newPass = await bcrypt.hash(req.body.password,salt);
            const update = await User.findByIdAndUpdate(req.userId,{
                password: newPass
            });
            res.send(update);
        }
        else {
            res.send("please login")
        }
    }
    catch(err) {
        res.send(err);
    }
})

router.post("/verify", async (req,res)=>{

    try{
        const verify = jwt.verify(req.query.token,"qwerty!@#$");
        if(!verify) {
            res.send(false)
        }
        res.send(true)
       
    }
    catch(err){
        res.send(err)
    }
})

router.post("/enroll/:courseid", async (req, res) => {
    try {
        if (req.isAuth) {
            const courseId = req.params.courseid;
            const courseUpdate = await User.findByIdAndUpdate(req.userId, { "$push": { "enrolled": courseId } });
            res.send(courseUpdate);
        }
        else {
            res.send("please login")
        }
    }
    catch (err) {
        res.send(err)
    }
})


module.exports = router