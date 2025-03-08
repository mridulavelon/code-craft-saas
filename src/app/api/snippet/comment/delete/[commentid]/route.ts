import connectToDatabase from "@/lib/mongo";
import { NextResponse } from "next/server";
import comments from "@/lib/models/comments";
export async function DELETE(req: Request,context:any) {
    try {
      const { params } = context;
      const paramsData = await params;
      await connectToDatabase();
      const deletedItem = await comments.findByIdAndDelete(paramsData.commentid);
      if (!deletedItem) {
        return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Failed to delete comment" }, { status: 500 });
    }
  }