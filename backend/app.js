const express = require("express")
const app = express()
const errorMiddleware = require("./middlewares/errors")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Import all routes
const products = require("./routes/product")
const auth = require("./routes/auth")

app.use("/api/v1", products)
app.use("/api/v1", auth)


if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
    } )
}

// Middleware to handle errors
app.use(errorMiddleware)


module.exports = app