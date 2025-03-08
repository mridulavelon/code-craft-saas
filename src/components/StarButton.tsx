import axios from "axios";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function StarButton({ snippetId }: any) {
   const { data : session, status } : any = useSession();
   const [isStarred,setIsStarred]  =  useState(false);

  const checkIsStarred = async(snippedId:string,email:string) => {
    const checkStarredRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stars/${email}/${snippedId}`);
    setIsStarred(checkStarredRequest.data?.data?.length > 0 ? true : false);
  }

  useEffect(() => {
    if(status === "authenticated"){
      checkIsStarred(snippetId,session.user.email);
    }
  },[status])
   

  const handleStar = async() => {
    const payload = {
      snippetId:snippetId
    }
    if(!isStarred){
      const createStarRequest = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stars/${session.user.email}`,payload);
       checkIsStarred(snippetId,session.user.email)
    }
  };

  return (
    <>
    {status === "authenticated" && (
      <button
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
    transition-all duration-200 ${
      isStarred
        ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
        : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
    }`}
      onClick={handleStar}
    >
      <Star
        className={`w-4 h-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`}
      />
    </button> 
    )}
    </>
  );
}

export default StarButton;
