'use server';

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Collector from "@/models/Collector";

async function connect() {
   return  mongoose.connect(process.env.MONGODB_URL as string);
}


export async function createCollector(formData:FormData){
    const {...data} = Object.fromEntries(formData);
    await connect();
    const session = await getServerSession(authOptions);
    const newAdData = {
        ...data,
        userEmail: session?.user?.email,
     };
      const newCollector = await Collector.create(newAdData);
      return JSON.parse(JSON.stringify(newCollector));
   
}