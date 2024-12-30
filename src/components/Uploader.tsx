'use client';
import { IKUpload, IKContext } from "imagekitio-react";
import IKUploadProps from "imagekitio-next/dist/types/components/IKUpload/props";

export default function Uploader(props: IKUploadProps) {
  return (
    <IKContext
      publicKey={process.env.NEXT_PUBLIC_IK_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IK_ENDPOINT}
      authenticator={async () => {
        const response = await fetch('/api/imagekit/auth/')
        return await response.json();
      }}
    >
      <IKUpload {...props} />
    </IKContext>
  );
}
