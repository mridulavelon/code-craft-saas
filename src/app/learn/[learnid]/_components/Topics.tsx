"use client";
import useStore from '@/store/store';
import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import React, { useState } from 'react'

const Topics = ({ topics } : any) => {
  const [selectedTopic,setSelectedTopic] = useState({});
   const { language, editor }:any = useCodeEditorStore();
   const { updateLoading,updateShowLogin } = useStore();
  return (
    <div className="h-48">
     {topics?.length > 0 ? (
             <ul>           
             {topics?.map((topic:any) => (
               <li key={topic.id} className="hover:bg-blue-500 rounded-lg p-4 cursor-pointer" onClick={() => {
                setSelectedTopic(topic);
                localStorage.setItem(`editor-code-${language}`,topic.snippet);
                const savedCode = localStorage.getItem(`editor-code-${language}`);
                updateShowLogin(true);
                if (editor) editor.setValue(savedCode);
              }}>{topic.topic}</li>
             ))}
           </ul>
         ) : (
          <ul>No topics found</ul>
         )}
    </div>    
  )
}

export default Topics;