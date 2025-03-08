import connectToDatabase from "@/lib/mongo";
import { NextResponse } from "next/server";
import language from "@/lib/models/language";

export async function GET(request:Request,context:any) {
  try {
    const { params } = context;
    const paramsData = await params;
    await connectToDatabase();
    const result = await language.findOne({ langId : paramsData.id });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Failed to fetch Language" }, { status: 500 });
  }
}