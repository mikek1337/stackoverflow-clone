'use client'
import { ArrowBigRight, LoaderIcon, PowerIcon, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import EditorOutput from "../editoroutput";
import { PostAIAnswer } from "./postaianswer";
type AskAiProps = {
    questionId:string
}
export const AskAi:FC<AskAiProps> = ({questionId})=>{
    const {isLoading, mutate, data} = useMutation({
        mutationFn:async()=>{
            const res = await axios.get(`/api/question/ai?questionId=${questionId}`);
            return  res.data;
        } 
    });
    
    const onAskAi = ()=>{
        mutate();
    }
    
    return(
        <div className="w-full">
            <div className="flex items-center justify-end my-1">
            <Button className="w-fit gap-1 group" variant="secondary" onClick={()=>onAskAi()}>
            {
                !isLoading?(
                    <>
                        <span>Ask AI</span>
                        <ArrowBigRight className="w-5 h-5 fill-white group-hover:fill-green-600 group-hover:text-green-500"/>
                    </>
                    ):(<LoaderIcon className="w-5 h-5 animate-spin"/>)
            }
            </Button>
        </div>
        <div className="my-10">
            {data && !isLoading &&(
                <>
                <span className="text-sm font-extrabold text-zinc-500 flex items-start gap-2 ">AI-generated <Stars className="w-5 h-5 text-yellow-500 fill-yellow-500" /></span>
                <EditorOutput content={data}/>
                <PostAIAnswer questionId={questionId} content={data}/>
                </>
            )}
        </div>
        </div>
    )
}