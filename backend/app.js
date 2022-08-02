const express = require("express")
const app = express()
const errorMiddleware = require("./middlewares/errors")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")

app.use(express.json())
app.use(cookieParser())
app.use(cors())

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({path: './config/config.env'})
 }


// Import all routes
const products = require("./routes/product")
const auth = require("./routes/auth")



app.use("/api/v1", products)
app.use("/api/v1", auth)

// Middleware to handle errors
app.use(errorMiddleware)


module.exports = app