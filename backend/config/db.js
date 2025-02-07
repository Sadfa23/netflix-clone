import mongoose from "mongoose";
import ENV_VARS from "./envVars.js";

const connectToDb = async function () {
    try {
        const connectDb = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error connecting database');
        console.log(error)
    }
}

export default connectToDb