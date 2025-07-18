import mongoose from "mongoose";

export const connectionDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected Successfully!....')
        return;
    }catch(e){
        console.log('DB Connection failed!...')
    }
}