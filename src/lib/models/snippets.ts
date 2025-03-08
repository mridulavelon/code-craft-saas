import mongoose, { Schema, Document } from "mongoose";
  
export interface ISnippet extends Document {
  title: string;
  language: string;
  username: string;
  userId: string;
  code: string;
  creationTime:Date;
}

const snippetSchema = new Schema<ISnippet>({
  title: { type: String, required: true },
  language: { type: String,required: true },
  username: { type: String,required:true },
  userId: { type: String,required:true },
  code: { type: String,require:true },
  creationTime:{type:Date,required:true},
});

export default mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", snippetSchema);
