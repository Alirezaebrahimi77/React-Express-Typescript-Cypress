const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require("../models/user")

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    
    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler("You have to log in to access this resource"), 403)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => catchAsyncErrors(async (req, res, next) => {
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler("You're not allowed to access this resource"), 403)
    }
    next()
})