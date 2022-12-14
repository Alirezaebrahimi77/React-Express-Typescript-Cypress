const Product = require("../models/product")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

// Create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})


// get single product by id  => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product didn't found by this ID", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update single product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req,res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product didn't found by this ID", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete product  => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product didn't found by this ID", 404))
    }

    await Product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })

})

exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find()

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

