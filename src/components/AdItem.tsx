'use client';
import Link from "next/link";
import UploadThumbnails from "./UploadThumbnails";
import { Ad } from "@/models/Ad";

export default function AdItem({ad}:{ad:Ad}) {
    return(
        <>
            <div
                key={ad._id}
                className={`bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-200 
                border ${
                  Number(ad.price) > 0
                    ? "border-l-4 border-orange-400 border-t-0 border-r-0 border-b-0 "
                    : "border-black-200"
                }`}
              >
                {ad.files?.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full object-cover">
                      <UploadThumbnails onClick={() => {}} file={ad.files[0]} />
                    </div>
                    <Link href={`/ad/${ad._id}`} className="absolute inset-0"></Link>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 truncate">
                    <Link href={`/ad/${ad._id}`}>{ad.title}</Link>
                  </h3>
                  {Number(ad.price) > 0 && (
                    <p className="font-medium mt-2 text-gray-800">
                      Price: ₹{ad.price?.toString()}
                    </p>
                  )}
                </div>
              </div>
        </>
    );

}