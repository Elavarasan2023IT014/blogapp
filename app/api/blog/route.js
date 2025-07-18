import { connectionDB } from "@/lib/mongoose";
import { Blog } from "@/Models/Blog";


export async function POST(request) {
    await connectionDB();
    const data = await request.json();
    const blogData = await Blog.create(data);
    return Response.json({blogData});
}

export async function GET() {
    await connectionDB();
    const Blogdata = await Blog.find();
    return Response.json({Blogdata});
}


export async function PATCH(request) {
    await connectionDB();
    const data = await request.json();
    const patchedData = await Blog.findOneAndUpdate({id:data.id},data,{new:true});
    return Response.json({patchedData});
}

export async function DELETE(request) {
    await connectionDB();
    const {id} = await request.json();
    const deletedData = await Blog.findOneAndDelete({id});
    return Response.json({message:"Deleted successfully !"});    
}