import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


const connectDB = async () => {
    try {
        const conneectionInstance=await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`MongoDB connected !! DB HOST: ${conneectionInstance.connection.host}`);


    } catch (error) {
        console.error("MONGODB Connection error : ", error)
        process.exit(1)
    }
}

export default connectDB;