import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import user from "@/lib/models/user";
import connectToDatabase from "@/lib/mongo";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ success:false,response: "All fields are required" });
  }
  await connectToDatabase();
  const foundUser = await user.findOne({ email:email });
  if (!foundUser) {
    return NextResponse.json({ success:false,response: "Invalid username or password" });
  }
  const isValidPassword = await bcrypt.compare(password ?? "",foundUser.password as string);
  if(!isValidPassword){
    return NextResponse.json({ success:false,response: "Invalid username or password" });
  }
  return NextResponse.json({success:true,response:foundUser});
}
