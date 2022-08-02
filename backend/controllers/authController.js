const User = require("../models/user")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name, email, password } = req.body

    const user = await User.create({
        name, 
        email,
        password,
        avatar: {
            public_id: 'avatars/kdjfdslkfjlsk3ler2',
            url: 'https://res.cloudinary.com/fjds/Fds.png'
        }
    })
    sendToken(user, 201, res)

})

// login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const {email, password} = req.body

    // Checks if email and password is entered
    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password", 400))
    }

    // Finding user in database
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    // Compare password
    const isMatchedPassword = await user.comparePassword(password)

    if(!isMatchedPassword){
        return next(new ErrorHandler("Password is wrong", 403))
    }

    sendToken(user, 200, res)

})

// Logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "You logged out successfully."
    })

})