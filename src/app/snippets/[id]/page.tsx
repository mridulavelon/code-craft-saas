"use client";
import { useParams } from "next/navigation";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import { ChevronRight, Clock, Code, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/compiler/_constants";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";
import axios from "axios";
import { useEffect, useState } from "react";

function SnippetDetailPage() {
  const [snippet,setSnippet] = useState({
    _id:"test",
    language:"javascript",
    title:"test",
    username:"test",
    creationTime:"test",
    code:"test",
  })
  const [commentsObj,setCommentsObj] = useState({
    comments:[],
    commentStatus: "",
    isLoadingComments: false,
    loadMore:false,
  })
  const [commentsPage,setCommentsPage] = useState(1);
  const snippetId = useParams().id;
  const getSnippet = async(snippetId:string | string[] | undefined) => {
    const snippetRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/snippet/${snippetId}`);
    setSnippet(snippetRequest.data.data);
  }

  const getComments = async(snippetId:string | string[] | undefined) => {
    const commentsRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/snippet/comment/${snippetId}?page=${String(commentsPage)}&limit=10`);
    const newComments:any = [...commentsObj.comments,commentsRequest.data.data.comments];
    setCommentsObj(prevState => ({
      ...prevState,
      comments:commentsPage === 1 ? commentsRequest.data.data.comments : newComments,
      commentStatus: commentsRequest.data.data.commentStatus,
      isLoadingComments: commentsRequest.data.data.isLoadingComments,
      loadMore:commentsRequest.data.data.loadMore,
    }));
  }

  useEffect(() => {
     getSnippet(snippetId);
     getComments(snippetId);
  },[snippetId])

  useEffect(() => {
    getComments(snippetId)
  },[commentsPage])

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
                  <img
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {snippet.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <User className="w-4 h-4" />
                      <span>{snippet.username}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(snippet.creationTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <MessageSquare className="w-4 h-4" />
                      <span>{commentsObj?.comments?.length} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-sm font-medium">
                {snippet.language}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
              <div className="flex items-center gap-2 text-[#808086]">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Source Code</span>
              </div>
              <CopyButton code={snippet.code} />
            </div>
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
              value={snippet.code}
              theme="vs-dark"
              beforeMount={defineMonacoThemes}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                readOnly: true,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
              }}
            />
          </div>

          <Comments 
           snippetId={snippet._id} 
           comments={commentsObj.comments}
           getComments={getComments}
           />
           {commentsObj.commentStatus === "CanLoadMore" && commentsObj.loadMore && (
              <div className="flex flex-row justify-center items-center mt-4">
              <button
                onClick={() => setCommentsPage(commentsPage + 1)}
                className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg flex justify-center items-center gap-2 
                transition-colors font-semibold"
              >
                Load More
                <ChevronRight className="w-4 h-4" />
              </button>
              </div>
           )}
        </div>
      </main>
    </div>
  );
}
export default SnippetDetailPage;
