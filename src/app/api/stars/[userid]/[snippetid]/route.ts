import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import user from "@/lib/models/user";
import stars from "@/lib/models/stars";


export async function GET(request:Request,context:any) {
    try {
      const { params } = context;
      const paramsData = await params;
      await connectToDatabase();
      const foundUser  = await user.findOne({ email: paramsData.userid });
      const starredSnippetDetail = await stars.find({ userId:foundUser._id,snippetId:paramsData.snippetid});
      return NextResponse.json({ success: true, data: starredSnippetDetail });
    } catch (error) {
      return NextResponse.json({ success: false, response: "Failed to fetch starred snippet" }, { status: 500 });
    }
  }