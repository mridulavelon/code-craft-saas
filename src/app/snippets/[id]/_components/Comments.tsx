import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";
import axios from "axios";

function Comments({ snippetId,comments,getComments }:any) {
  const { data : session, status } : any = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletinCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [userInfo,setUserInfo] = useState<any>({});
  

  const getUserInfo = async(email:string) => {
    try{
     const userInfoRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${email}`);
     setUserInfo(userInfoRequest.data.data);
    }catch(error:any){
     return {error:error.message};
    }
 }


  useEffect(() => {
    if(status === "authenticated"){
      getUserInfo(session.user.email);
    }
  },[status])


  const addComment = async(snippetId:string,content:string,email:string) => {
    const payload={
      content:content,
      userId:email,
      snippetId:snippetId,
    }
    const addCommentRequest = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/snippet/comment`,payload);
    await getComments(snippetId);
  }

  const deleteComment = async(commentId:string) => {
    const deleteCommentRequest = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/snippet/comment/delete/${commentId}`);
    await getComments(snippetId);
  }

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await addComment(snippetId,content,session.user.email);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);
    try {
      await deleteComment(commentId);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {status === "authenticated" ? (
          <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
        ) : (
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-4">Sign in to join the discussion</p>
              <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
                Sign In
              </button>
          </div>
        )}
        {comments?.length > 0 && (
          <div className="space-y-6">
          {comments?.map((comment:any,index:number) => (
            <Comment
              key={comment?._id ?? index} 
              comment={comment}
              onDelete={handleDeleteComment}
              isDeleting={deletinCommentId === comment._id}
              currentUserId={userInfo?._id ?? ""} 
            />
          ))}
          </div>
          )}
      </div>
    </div>
  );
}
export default Comments;
