import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
 content: string;
 snippetId:string;
 userId:string;
 creationTime:Date;
 username:string
}

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  snippetId:{ type: String, required: true },
  userId: { type: String, required: true },
  creationTime: { type: Date, required: true },
  username: { type: String, required: true },
});

export default mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);
