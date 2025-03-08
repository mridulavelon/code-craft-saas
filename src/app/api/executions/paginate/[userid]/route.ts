import connectToDatabase from "@/lib/mongo";
import { NextResponse } from "next/server";
import codeexecutions from "@/lib/models/codeexecutions";
import user from "@/lib/models/user";
import stars from "@/lib/models/stars";
import snippets from "@/lib/models/snippets";

export async function GET(request: Request,context:any) {
    try {
      await connectToDatabase();
      const { searchParams } = new URL(request.url);
      const { params } = context;
      const paramsData = await params;
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const foundUser  = await user.findOne({ email: paramsData.userid });
      const totalExecutions = await codeexecutions.find({ userId: foundUser._id }).countDocuments();
      const executions = await codeexecutions.find({ userId: foundUser._id }).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
      const hasMore = page * limit < totalExecutions; 
      return NextResponse.json({
        success: true,
        data:{
           executions:executions,
           executionStatus: hasMore ? "CanLoadMore" : "CannotLoadMore",
           isLoadingExecutions:false,
           loadMore:hasMore, 
        }
      });
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        data:{
            executions:[],
            executionStatus: "CannotLoadMore",
            isLoadingExecutions:false,
            loadMore:false, 
         }
      });
    }
  }