'use client';

import Uploader from "@/components/Uploader";
import UploadThumbnails from "@/components/UploadThumbnails";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import Link from "next/link";
import { useState, useRef } from "react";
import { createAddItem } from "../actions/adActions";
import SubmitButton from "@/components/SubmitButton";
import { redirect } from "next/navigation";


export default function NewPostItem() {
  const [files, setFiles] = useState<(UploadResponse | IKUploadResponse)[]>([]);
  const fileInRef = useRef<HTMLDivElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUsable, setIsUsable] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("files", JSON.stringify(files));
    const result = await createAddItem(formData);
    redirect("/ad/" + result._id);
  }

  function handleSaveAsDraft() {
    alert("Item saved as draft! Draft functionality coming soon.");
  }
  

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {/* Header */}
      <div className="form-header">
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>Post Your Item</h1>
      </div>

      {/* Item Details Section */}
      <div className="form-section">
        <label htmlFor="titleIn">Title *</label>
        <input type="text" name="title" id="titleIn" placeholder="Enter title" required />
        <br /><br />
        <label htmlFor="descrp">Description</label>
      <textarea
          name="description"
          placeholder="Description"
          id="descIn"
        ></textarea>
        <label htmlFor="categoryIn">Category *</label>
        <select name="category" id="categoryIn" required>
          <option disabled value="">
            Select category
          </option>
          <option value="metal">Metals</option>
          <option value="wood">Wood</option>
          <option value="glass">Glass</option>
          <option value="paper">Papers</option>
          <option value="Electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="Household">Household</option>
          <option value="others">Others</option>
        </select>
        <br /><br />
        <label htmlFor="adrIn">Address *</label>
        <textarea name="address" placeholder="Enter address" id="adrIn" required></textarea>
<br /><br />
<label htmlFor="contactIn">Contact *</label>
        <input type="text" name="contact" id="titleIn" placeholder="Enter Contact Number" required />
        
        <br /><br />
        <label htmlFor="weightIn">Weight (kg) </label>
        <input type="number" name="weight" placeholder="Enter weight" id="weightIn"  />
<br />
      
      </div>

      {/* Usable Value Section */}
      <div className="form-section">
        <label>Is it Valuable? *  </label>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setIsUsable(!isUsable)}
            title="Is it Valuable?"
          />
          <span className="slider round"></span>
        </label>
        {isUsable && (
          <div>
            <label htmlFor="priceIn">Price </label>
            <input type="number" name="price" id="price" placeholder="Enter price in INR" />
          </div>
        )}
      </div>
     


      {/* Image Upload Section */}
      <div className="grid grid-cols justify-centers">
        <h3>Upload image</h3>
        <label
          className={
            "border bg-blue-300 rounded-xl h-16 w-40 flex justify-center cursor-crosshair items-center " +
            (isUploading
              ? " text-red-500 cursor-not-allowed"
              : "border bg-gray-300 rounded-xl h-16 w-40 flex justify-center cursor-crosshair items-center ")
          }
        >
          <div ref={fileInRef} className="hidden">
            <Uploader
              onUploadStart={() => setIsUploading(true)}
              onSuccess={(file) => {
                setFiles((prev) => [...prev, file]);
                setIsUploading(false);
              }}
            />
          </div>
          <span>{isUploading ? "Uploading..." : "Add photos"}</span>
        </label>
        <div className="grid grid-cols-3 gap-4 pt-3">
          {files.map((file, index) => {
            const normalizedFile: UploadResponse = {
              ...file,
              AITags: file.AITags?.map((tag) => ({
                name: (tag as any).name || "",
                confidence: (tag as any).confidence || 0,
                source: (tag as any).source || "",
              })),
            } as UploadResponse;

            return (
              <UploadThumbnails
                key={file.fileId || index}
                file={normalizedFile}
                onClick={() => {}}
              />
            );
          })}
        </div>
      </div>
      {/* Submit & Save Buttons */}
      <div className="button-group">
      <button type="button" className="save-draft-button" onClick={handleSaveAsDraft}>
          Save as Draft
        </button>
        <SubmitButton>Publish</SubmitButton>

      </div>
    </form>
  );
}
