import { connectionDB } from "@/lib/mongoose";
import { Blog } from "@/Models/Blog";

export async function GET(req,{params}) {
    await connectionDB();

    const {id} = params;
    const data = await Blog.findOne({id})

    return Response.json({data})
}