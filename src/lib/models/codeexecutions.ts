import mongoose, { Schema, Document } from "mongoose";
  
  export interface ICodeExecution extends Document {
    userId: string,
    language: string,
    code: string,
    output?: string,
    error?: string,
    creationTime:Date
  }
  
  const codeExecutionSchema = new Schema<ICodeExecution>({
   userId:  { type: String, required: true },
   language: { type: String, required: true },
   code: { type: String,required:true },
   output: { type: String },
   error:{ type: String },
   creationTime:{type:Date,required:true},
  });
  
  export default mongoose.models.CodeExecution || mongoose.model<ICodeExecution>("CodeExecution", codeExecutionSchema);
  