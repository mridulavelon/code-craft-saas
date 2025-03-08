import mongoose, { Schema, Document } from "mongoose";

export interface ITopic {
    id: string;
    topic: string;
    description:string;
    snippet: string;
  }

export interface ILanguage extends Document {
  title: string;
  topics: ITopic[];
  type: string;
  langId: string;
}

const TopicSchema = new Schema<ITopic>({
    id: { type: String, required: true },
    topic: { type: String, required: true },
    snippet: { type: String, required: true },
  });
  

const LanguageSchema = new Schema<ILanguage>({
  title: { type: String, required: true },
  topics: { type: [TopicSchema], required: true },
  type: { type: String, required:true },
  langId: { type: String,unique:true,required:true },
});

export default mongoose.models.Language || mongoose.model<ILanguage>("Language", LanguageSchema);
