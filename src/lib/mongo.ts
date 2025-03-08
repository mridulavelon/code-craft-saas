import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function connectToDatabase() {
  if(mongoose.connection.readyState === 1){
     return mongoose;
  }
  const opts = {
    bufferCommands:false
  }
  try{
    await mongoose.connect(MONGODB_URI!,opts)
    console.log("Mongo Connected")
  }catch(error){
    console.log(error,"Error connecting to mongodb")
  }
  return mongoose;
}

export default connectToDatabase;

