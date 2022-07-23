const express = require("express")

const Invoice = require("../models/invoices")

const router = express.Router();


router.post("/addInvoice", async (req, res) => {
    try {
        if (req.isAuth) {
            if (req.admin) {
                const data = await Invoice.create({
                    name: req.body.name,
                    total_fee: req.body.total_fee,
                    paid_amount: req.body.paid_amount,
                    balance: req.body.balance,
                    whatsapp_number: req.body.whatsapp_number,
                    courseId: req.body.courseId,
                    studentId: req.body.studentId
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

router.get("/invoice/:invoiceId", async (req, res) => {
    try {
        if (req.isAuth) {
            const studentInvoice = await Invoice.find({ _id: req.params.invoiceId });
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