import mongoose, { Schema, Document } from "mongoose";

export interface IStar extends Document {
  snippetId: string;
  userId: string;
}

const starsSchema = new Schema<IStar>({
  snippetId: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.models.Star || mongoose.model<IStar>("Star", starsSchema);
