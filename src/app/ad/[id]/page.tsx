'use server';

import { connect } from "@/app/libs/helpers";
import UploadThumbnails from "@/components/UploadThumbnails";
import UploadView from "@/components/UploadView";
import { Admodel } from "@/models/Ad";

type Props = {
    params:{
        id:string;
    }
    searchPaarams:{[key : string]:string};
};


export default async  function SingleAdPage(args : Props) {
    await connect();
    const adDoc = await Admodel.findById(args.params.id);

    if(!adDoc)
    {
        return 'Not Found';
    }

    return(
        <div className="flex">
            
            <div className=" p-4">
               <h1 className="font-bold">{adDoc.title}</h1>
               <label>Description:</label>
               <p>{adDoc.description}</p>
                <label>category:</label>
                <p>{adDoc.category}</p>
                <label>condition:</label>
                <p>{adDoc.address}</p>
            </div>

        </div>
    );
}