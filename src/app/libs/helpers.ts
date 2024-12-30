import mongoose from "mongoose";

export async function connect() {
   return  mongoose.connect(process.env.MONGODB_URL as string);
}