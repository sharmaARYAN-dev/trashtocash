import { UploadResponse } from "imagekit/dist/libs/interfaces";

export default function UploadThumbnails({ file }: { file: UploadResponse }) {
    if (file.fileType === 'image') {
        return (
            <a href={file.url} target="_blank">
                <img className="rounded-lg" src={file.url +'?tr=w-80,h-90'} alt="Uploaded" />
            </a>
            
        );
    }
    return (
        <div>{file.url} &raque;</div>
    );
}
