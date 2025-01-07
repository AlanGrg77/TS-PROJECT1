import mongoose from "mongoose";
import envConfig from "./config";

const connectToDB = async () =>{
    try{
         mongoose.connection.on('connected',()=>{
            console.log('DB connected successfully')
         })
        await mongoose.connect(envConfig.mongoDBString as string)
    }
    catch(err){
        console.log('Failed to connect to DB');
        process.exit(1);
    }
}

export default connectToDB