const Product = require("../models/product")
const data = require("../data/products.json")
const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })

}
connectDatabase()
const seedProducts = async () =>{
    try{
        await Product.deleteMany()
        console.log("Products are deleted");
        await Product.insertMany(data)
        console.log("Product are added");

    }catch(error){
        console.log(error.message)
        process.exit()
    }
} 


seedProducts()


