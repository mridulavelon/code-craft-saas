import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import snippets from "@/lib/models/snippets";

export async function GET(request:Request,context:any) {
  try {
    const { params } = context;
    const paramsData = await params;
    await connectToDatabase();
    const result = await snippets.findOne({ _id : paramsData.snippetid });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, response: "Failed to fetch snippet" }, { status: 500 });
  }
}