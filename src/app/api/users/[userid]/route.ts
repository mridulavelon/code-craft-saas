import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import user from "@/lib/models/user";

export async function GET(request:Request,context:any) {
  try {
    const { params } = context;
    const paramsData = await params;
    await connectToDatabase();
    const result = await user.findOne({ email : paramsData.userid }).select("-password");
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, response: "Failed to fetch snippets" }, { status: 500 });
  }
}