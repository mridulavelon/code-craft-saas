import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import snippets from "@/lib/models/snippets";
import user from "@/lib/models/user";
import stars from "@/lib/models/stars";

export async function GET(request:Request,context:any) {
  try {
    const { params } = context;
    const paramsData = await params;
    await connectToDatabase();
    const foundUser  = await user.findOne({ email: paramsData.userid });
    const starredSnippets = await stars.find({ userId:foundUser._id});
    const snippetIds = starredSnippets?.map((star) => star.snippetId);
    const snippetDetails = await Promise.all(snippetIds?.map(async(id) => {
      const result = await snippets.findOne({ _id : id });
      return result;
    }));
    return NextResponse.json({ success: true, data: snippetDetails });
  } catch (error) {
    return NextResponse.json({ success: false, response: "Failed to fetch snippets" }, { status: 500 });
  }
}

export async function POST(req: Request,context:any) {
    try{
      const { snippetId } = await req.json();
      const { params } = context;
      const paramsData = await params;
      if (!snippetId) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
    await connectToDatabase();
    const foundUser = await user.findOne({ email:paramsData.userid });
    const newStarredSnippet = new stars({ 
      userId: foundUser._id,
      snippetId:snippetId
     });
     await newStarredSnippet.save();
     return NextResponse.json({ message: "Snippet starred successfully" }, { status: 201 });
    }catch(error){
     return NextResponse.json({ message: "Failed to star snippet" }, { status: 201 });
    }
  }

  
  export async function DELETE(req: Request,context:any) {
    try{
      const { snippetId } = await req.json();
      const { params } = context;
      const paramsData = await params;
      if (!snippetId) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
    await connectToDatabase();
    const foundUser = await user.findOne({ email:paramsData.userid });
    const newStarredSnippet = new stars({ 
      userId: foundUser._id,
      snippetId:snippetId
     });
     await newStarredSnippet.save();
     return NextResponse.json({ message: "Snippet starred successfully" }, { status: 201 });
    }catch(error){
     return NextResponse.json({ message: "Failed to star snippet" }, { status: 201 });
    }
  }