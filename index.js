const express = require("express")
const {urlencoded,json} = require("express")
const mongoose = require("mongoose")
const cors = require('cors');


const dotenv =require("dotenv")
dotenv.config()
mongoose.connect(process.env.MONGODB_STRING)

const userRouter = require("./routes/user")
const courseRouter = require("./routes/courses")
const invoiceRouter = require("./routes/invoice")
const studentRouter = require("./routes/student")
const addressRouter = require("./routes/address")
const auth = require("./middleware/auth");

const app = express()

app.use(cors())


app.use(auth)
app.use(json())
app.use(urlencoded({extended:false}))

app.use("/users",userRouter)
app.use("/courses",courseRouter)
app.use("/invoices",invoiceRouter)
app.use("/students",studentRouter)
app.use("/address",addressRouter)
app.listen(4500)
