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
  const fileInRef = useRef<HTMLDivElement | null>(null); // Explicitly typed
  const [isUploading, setIsUploading] = useState(false);
 

    async function handleSubmit(formData:FormData){

        formData.set('files', JSON.stringify(files));
        const result =await createAddItem(formData);
        console.log({result});
        redirect('/ad/'+result._id);
    }

  return (
    <form action={handleSubmit} className="grid grid-cols gap-3 justify-center">
      <div className="grid gap-3 justify-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1>Item details</h1>
        </div>
        <label htmlFor="titleIn">title</label>
        <input type="text" name="title" id="titleIn" placeholder="Title" />

        <label htmlFor="categoryIn">category</label>
        <select name="category" id="categoryIn">
          <option defaultValue={"none"} disabled value="">
            select category
          </option>
          <option value="metal">metals</option>
          <option value="wood">wood</option>
          <option value="glass">glass</option>
          <option value="others">others</option>
        </select>
        <label htmlFor="adrIn">address</label>
        <textarea name="address" placeholder="address" id="adrIn"></textarea>
        <label htmlFor="weightIn">weight</label>
        <input type="number" name="weight" placeholder="weight" id="weightIn" />
        <select name="condition" id="conditionIn">
          <option defaultValue={"none"} disabled value="">
            select condition
          </option>
          <option value="good">good</option>
          <option value="moderate">moderate</option>
          <option value="bad">bad</option>
        </select>

        <label>is usable?</label>
        <div className="flex gap-3">
          <input type="radio" name="usable" value="val" id="usableIn" />
          yes
          <input type="radio" name="usable" value="nonval" id="usableIn" />
          no
        </div>

        <label>is total scrap?</label>
        <div className="flex gap-3">
          <input type="radio" name="tscrap" value="tsp" id="TscrapIn" />
          yes
          <input type="radio" name="tscrap" value="nontsp" id="TscrapIn" />
          no
        </div>
        <textarea name="contactinfo" placeholder="Contact-info" id="contcIn"></textarea>
        <textarea name="description" placeholder="description" id="descIn"></textarea>
      </div>
      <div className="grid grid-cols  justify-centers">
        <h3>upload image</h3>
        

        <label
          
          className={
            "border bg-blue-300 rounded-xl h-16 w-40 flex justify-center cursor-crosshair items-center "
          + (
          isUploading
          ? ' text-red-500 cursor-not-allowed'
           : "border bg-gray-300 rounded-xl h-16 w-40 flex justify-center cursor-crosshair items-center ")} 
         
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
        <span>{isUploading? 'uploading...' : 'add photos' }</span>
        </label>
        <div className="grid grid-cols-3 gap-4 pt-3 ">
        {
  files.map((file, index) => {
    // Normalize if the file is an IKUploadResponse
    const normalizedFile: UploadResponse = {
      ...file,
      AITags: file.AITags?.map((tag) => ({
        name: (tag as any).name || "",
        confidence: (tag as any).confidence || 0,
        source: (tag as any).source || "",
      })),
    } as UploadResponse;

    return <UploadThumbnails key={file.fileId || index} file={normalizedFile} />;
  })

}
        </div>
  
      </div>
      <SubmitButton>Publish</SubmitButton>
    </form>
  );
}
