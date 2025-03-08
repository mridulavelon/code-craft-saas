import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import user from "@/lib/models/user";
import connectToDatabase from "@/lib/mongo";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  await connectToDatabase();
  const existingUser = await user.findOne({ email:email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists by provided email id" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new user({ name, email, password: hashedPassword, provider: "credentials" });
  await newUser.save();
  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}
