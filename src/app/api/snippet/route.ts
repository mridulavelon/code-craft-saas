import { NextRequest,NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import snippets from "@/lib/models/snippets";
import user from "@/lib/models/user";

export async function GET() {
  try {
    await connectToDatabase();
    const result = await snippets.find({});
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch snippets" }, { status: 500 });
  }
}

export async function POST(request:NextRequest){
  try{
    const requestData = await request.json();
    await connectToDatabase();
    const foundSnippet = await snippets.findOne({ title : requestData.title });
    const foundUser  = await user.findOne({ email: requestData.useremail });
    if(foundSnippet){
      return NextResponse.json({ success: false, response: "Snippet by this name already exists try any another name" });
    }else{
      snippets.create({
        title:requestData.title, 
        language:requestData.language,
        username:requestData.username,
        userId: foundUser._id,
        code:requestData.code,
        creationTime:new Date()            
      });
      return NextResponse.json({ success: true, response: "Snippet created successfully" });
    }
  }catch(error){
    return NextResponse.json({ success: false, response: "Failed to create snippet" });
  }
}