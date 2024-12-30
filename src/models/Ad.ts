import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { models, Schema,model, Model } from "mongoose";

type Ad={
    title:string;
    category:string;
    address:string;
    weight:Number;
    condition:string;
    usable:string;
    tscrap:string;
    contactinfo:string;
    description:string;
    files:UploadResponse[];
    userEmail:string;

}

const adSchema = new Schema<Ad>({
    title:String,
    category:String,
    address:String,
    weight:Number,
    condition:String,
    usable:String,
    tscrap:String,
    contactinfo:String,
    description:String,
    files: [Object],
    userEmail:{type:String, required:true},
},{
    timestamps:true,
});

export const Admodel = (models?.Ad as Model<Ad>) || model('Ad', adSchema);