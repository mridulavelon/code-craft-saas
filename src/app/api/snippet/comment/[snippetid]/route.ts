import connectToDatabase from "@/lib/mongo";
import { NextResponse } from "next/server";
import comments from "@/lib/models/comments";

export async function GET(request: Request,context:any) {
    try {
      await connectToDatabase();
      const { searchParams } = new URL(request.url);
      const { params } = context;
      const paramsData = await params;
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const totalComments = await comments.find({ snippetId: paramsData.snippetid }).countDocuments();
      const commentsResult = await comments.find({ snippetId: paramsData.snippetid }).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
      const hasMore = page * limit < totalComments; 
      return NextResponse.json({
        success: true,
        data:{
           comments:commentsResult,
           commentStatus: hasMore ? "CanLoadMore" : "CannotLoadMore",
           isLoadingComments:false,
           loadMore:hasMore, 
        }
      });
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        data:{
            comments:[],
            commentStatus: "CannotLoadMore",
            isLoadingComments:false,
            loadMore:false, 
         }
      });
    }
}