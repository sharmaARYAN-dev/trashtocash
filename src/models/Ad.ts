import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { models, Schema, model, Model } from "mongoose";

export type Ad = {
  _id: string;
  title: string;
  category: string;
  address: string;
  weight: Number;
  condition: string;
  usable: string;
  price: Number; 
  // tscrap: string;
  contact: string;
  description: string;
  files: UploadResponse[];
  userEmail: string;
}

const adSchema = new Schema<Ad>({
  title: String,
  category: String,
  address: String,
  weight: Number,
  condition: String,
  usable: String,
  price: { type: Number, default: 0 },
  // tscrap: String,
  contact: String,
  description: String,
  files: [Object],
  userEmail: { type: String, required: true },
}, {
  timestamps: true,
});

export const Admodel = (models?.Ad as Model<Ad>) || model('Ad', adSchema);
