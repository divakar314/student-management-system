const express = require("express")

const Course = require("../models/course")

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        if (req.isAuth) {
            const data = await Course.find({});
            res.send(data);
        }
        else {
            res.send("please login")
        }
    }
    catch (err) {
        res.send(err)
    }
})

router.post("/addCourse", async (req, res) => {
    try {
        if (req.isAuth) {
            console.log(req.admin);
            if (req.admin) {
                const data = await Course.create({
                    name: req.body.name,
                    description: req.body.description,
                    timings: req.body.timings,
                    duration: req.body.duration,
                    fees: req.body.fees,
                    techstack: req.body.techstack,
                    enrolledId: req.body.enrolledId
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

router.get("/course", async (req, res) => {
    try {
        if (req.isAuth) {
            const userPost = await Course.find({ admin: req.userId });
            res.send(userPost)
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