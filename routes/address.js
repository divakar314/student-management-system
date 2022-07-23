const express = require("express")

const Address = require("../models/address")

const router = express.Router();


router.post("/addAddress", async (req, res) => {
    try {
        if (req.isAuth) {
            if (req.admin) {
                const data = await Address.create({
                    name: req.body.name,
                    doorNo: req.body.doorNo,
                    street: req.body.street,
                    landMark: req.body.landMark,
                    city: req.body.city,
                    district: req.body.district,
                    state: req.body.state,
                    pin: req.body.pin
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

router.get("/address/:addressId", async (req, res) => {
    try {
        if (req.isAuth) {
            const studentAddress = await Address.find({ _id: req.params.addressId });
            res.send(studentAddress)
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