const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(env.mongoUri);

        console.log("MongoDB Connected");
        console.log(`Database: ${connection.connection.name}`);
        console.log(`Host: ${connection.connection.host}`);
    }catch(err){
        console.log("MongoDB connection Failed");
        console.error(err.message);

        process.exit(1);
    }
}

module.exports = connectDB;