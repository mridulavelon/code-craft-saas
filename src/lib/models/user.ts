import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: "credentials" | "google" | "github";
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  image: { type: String },
  provider: { type: String, required: true, enum: ["credentials", "google","github"] },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
