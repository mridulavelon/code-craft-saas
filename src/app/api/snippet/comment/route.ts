import { NextRequest,NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import user from "@/lib/models/user";
import comments from "@/lib/models/comments";


export async function POST(request:NextRequest){
    try{
      const requestData = await request.json();
      await connectToDatabase();
      const foundUser  = await user.findOne({ email: requestData.userId });
      const newComment = await new comments({
        content:requestData.content ,
        userId:foundUser._id,
        snippetId:requestData.snippetId,
        creationTime: new Date(),
        username:foundUser.name
      })
      await newComment.save();
      return NextResponse.json({ success: true, response: "Comment added successfully" });
    }catch(error){
      return NextResponse.json({ success: false, response: "Failed to create snippet" });
    }
  }