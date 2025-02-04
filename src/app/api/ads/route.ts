import { connect } from "@/libs/helpers";
import { Ad, Admodel } from "@/models/Ad";
import { FilterQuery } from "mongoose";

export async function GET(req: Request, res: Response) {
    await connect();
    const {searchParams}= new URL(req.url);
    const filter:FilterQuery<Ad> ={};

    const phrase = searchParams.get('phrase' );
    if(phrase) {
        filter.title = {$regex: '.*'+phrase+'.*', $options: 'i'};
    }

    const adsDocs = await Admodel.find(filter, null,{sort:{createdAt:-1}} );
    return Response.json(adsDocs);
}