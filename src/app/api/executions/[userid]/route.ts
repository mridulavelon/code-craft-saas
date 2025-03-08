import connectToDatabase from "@/lib/mongo";
import { NextResponse } from "next/server";
import codeexecutions from "@/lib/models/codeexecutions";
import user from "@/lib/models/user";
import stars from "@/lib/models/stars";
import snippets from "@/lib/models/snippets";

export async function GET(request:Request,context:any) {
  try {
    const { params } = context;
    const paramsData = await params;
    await connectToDatabase();
    const foundUser  = await user.findOne({ email: paramsData.userid });
    if(foundUser){
      const executions = await codeexecutions.find({ userId : foundUser._id });
      const starredSnippets = await stars.find({ userId: foundUser._id});
      const snippetIds = starredSnippets?.map((star) => star.snippetId);
      const snippetDetails = await Promise.all(snippetIds?.map(async(id) => {
        const result = await snippets.find({ _id : id });
        return result;
      }));
      const starredLanguages = snippetDetails?.filter(Boolean).reduce(
      (acc:any, curr:any) => {
        if (curr?.language) {
          acc[curr.language] = (acc[curr.language] || 0) + 1;
        }
        return acc;
      },{} as Record<string, number>);

    const mostStarredLanguage = Object.entries(starredLanguages).sort(([, a]:any, [, b]:any) => b - a)[0]?.[0] ?? "N/A";
    const last24Hours = executions?.filter(
      (e) => e.creationTime > Date.now() - 24 * 60 * 60 * 1000
    ).length;
    const languageStats = executions?.reduce(
      (acc, curr) => {
        acc[curr.language] = (acc[curr.language] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    const languages = Object.keys(languageStats);
    const favoriteLanguage = languages?.length ? languages?.reduce((a, b) => (languageStats[a] > languageStats[b] ? a : b)) : "N/A";
    const result =  {
        totalExecutions:executions.length,
        languagesCount:languages.length,
        languages:languages,
        last24Hours:last24Hours,
        favoriteLanguage:favoriteLanguage,
        languageStats:languageStats,
        mostStarredLanguage:mostStarredLanguage,
      };
    return NextResponse.json({ success: true, data: result });
    } 
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch CodeExecutions" }, { status: 500 });
  }
}


export async function POST(req: Request,context:any) {
  try{
    const { language,code,output,error } = await req.json();
    const { params } = context;
    const paramsData = await params;
    if (!language || !code || !output ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
  await connectToDatabase();
  const foundUser = await user.findOne({ email:paramsData.userid });
  const newCodeExecution = new codeexecutions({ 
    userId: foundUser._id,
    language: language,
    code: code,
    output: output,
    error: error ?? "",
    creationTime: new Date()
   });
   await newCodeExecution.save();
   return NextResponse.json({ message: "Code execution saved successfully" }, { status: 201 });
  }catch(error){
   return NextResponse.json({ message: "Failed to save code execution" }, { status: 201 });
  }
}