import mongoose from "mongoose";
import { config } from "./index.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(config.MONGO_CONNECTION_STRING);
        console.log(`\n MongoDB connected !! DB HOST ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export { connectDB }