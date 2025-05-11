import mongoose from 'mongoose';
import dotenv from 'dotenv'

const connectMongoDB = async()=>{
    dotenv.config()
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to MongoDB ");
        
    }catch(error){
        console.log("error connecting to MongoDB", error.message);
        
    }
}

export default connectMongoDB