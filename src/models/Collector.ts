import { UploadResponse } from "imagekit/dist/libs/interfaces";
import mongoose, { models, Schema, model, Model } from "mongoose";

export type Collector = {
  _id: string;
  businessName: string;
  ownerName: string;
  email: string;
  contactNo: string;
  officeAddress: string;
  homeAddress: string;
  gstin: string;
  aadharNumber: string;
  pan: string;
  yearOfStarting: number;
  files: UploadResponse[]; // For file upload responses
  userEmail: string; // Associated user's email
  userRole: string;
}

const collectorSchema = new Schema<Collector>({
  businessName: {
    type: String,
    required: true, // Business Name is mandatory
    trim: true, // Remove extra spaces
  },
  ownerName: {
    type: String,
    required: true, // Owner's Name is mandatory
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
   
  },
  contactNo: {
    type: String,
    required: true, // Contact Number is mandatory
    
  },
  officeAddress: {
    type: String,
    required: true, // Office Address is mandatory
    trim: true,
  },
  homeAddress: {
    type: String,
    required: true, // Home Address is mandatory
    trim: true,
  },
  gstin: {
    type: String,
    required: true, // GSTIN is mandatory
  },
  aadharNumber: {
    type: String,
    required: true, // Aadhar Number is mandatory
  },
  pan: {
    type: String,
    required: true, // PAN is mandatory
   
  },
  yearOfStarting: {
    type: Number,
    required: true, // Year of Starting is mandatory
    min: 1900, // Minimum year validation
    max: new Date().getFullYear(), // Year must not exceed current year
  },
  files: [
    {
      type: Object,
      required: false, // Files field for storing uploaded files
    },
  ],
  userEmail: { 
    type: String, 
    required: true, // Associated user's email
  },
  userRole: {
    type: String, 
    trim: true, // Remove extra spaces from the userRole
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

export default mongoose.models.Collector || mongoose.model("Collector", collectorSchema);
// export const CollectorModel = (models?.Collector as Model<Collector>) || model("Collector", collectorSchema);
