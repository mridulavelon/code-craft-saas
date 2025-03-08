"use client";
import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { useSession } from "next-auth/react";

function RunButton() {
  const { runCode, language, isRunning } = useCodeEditorStore();
  const { data : session, status } : any = useSession();
  
  const createCodeExecution = async(email:string,payload:any) => {
    const createExecutionRequest = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/executions/${email}`,payload);
  }

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();
    if(status === "authenticated" && result){
      const payload = {
        language:language,
        code:result.code,
        output:result.output,
        error:result.error
      }
      createCodeExecution(session.user.email,payload)
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-2.5 px-5 py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
      `}
    >
      {/* bg wit gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-semibold text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-semibold text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}
export default RunButton;
