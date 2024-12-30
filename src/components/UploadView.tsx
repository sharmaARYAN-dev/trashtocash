import { UploadResponse } from "imagekit/dist/libs/interfaces";
import Image from "next/image";

export default function UploadView({file}:{file:UploadResponse}) {
    if(file.fileType === 'image')
    {
        return(
            <Image src ={file.url} alt={'photo'} width={1000} height={1000} />
        );
    }
    return(
        <>
            {file.name}
        </>
    );
}