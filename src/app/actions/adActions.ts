'use server';

import { Admodel } from "@/models/Ad";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function connect() {
   return  mongoose.connect(process.env.MONGODB_URL as string);
}


export async function createAddItem(formData:FormData){
    const {files,...data} = Object.fromEntries(formData);
    await connect();
    const session = await getServerSession(authOptions);
    const newAdData = {
        ...data, 
        files: JSON.parse(files as string),
        userEmail: session?.user?.email,
     };
      const newAdDoc = await Admodel.create(newAdData);
      return JSON.parse(JSON.stringify(newAdDoc));
   
}