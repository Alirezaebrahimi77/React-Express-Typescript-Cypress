const app = require("./app")
const connectDatabase = require("./config/database")


// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })


// Handle uncought exeptions
process.on("uncaughtException", err => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down the server due to uncought exeptions');
    process.exit(1)
})

// Connecting to database
connectDatabase()



const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down the server due to unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})