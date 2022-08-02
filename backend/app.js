const express = require("express")
const app = express()
const errorMiddleware = require("./middlewares/errors")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Import all routes
const products = require("./routes/product")
const auth = require("./routes/auth")

app.use("/api/v1", products)
app.use("/api/v1", auth)

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({path: './config/config.env'})
 }

if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname, "/frontend/build")))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"))
    } )
 }

// Middleware to handle errors
app.use(errorMiddleware)


module.exports = app