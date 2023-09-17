"use client"
import { FC, Suspense, useRef, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Editor from "./editor";
import EditorJS from "@editorjs/editorjs";
import { getAuthSession } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { Divide } from "lucide-react";
import axios, { AxiosError } from "axios";
import { AnswerCreationRequest } from "@/lib/validators/post";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Answer from "./answer";
import { AnswerDetail } from "@/types/db";
import Loading from "@/app/loading";

interface PostAnswerProps {
  questionId: string;
  answerData:AnswerDetail[]
}

const PostAnswer: FC<PostAnswerProps> = async ({
  questionId,
  answerData,
}: PostAnswerProps) => {
 
  const ref = useRef<EditorJS>();
  const session = useSession();
  console.log(ref.current?.save());
  const { mutate: postAnswer } = useMutation({
    mutationFn: async ({ content, questionId }: AnswerCreationRequest) => {
      const payload: AnswerCreationRequest = {
        content,
        questionId,
      };
      const { data } = await axios.post("/api/answer/post", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast({
          title: "Something went wrong",
          description: err.code,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "your question was not posted. Please try again.",
          variant: "destructive",
        });
      }
    },
    onSuccess:()=>{
      toast({
        title:"Answer posted",
        variant:"default"
      })
    }
  });
  const submitAnswer = async (e:any) => {
    const content = await ref.current?.save();
    if (content) {
      const payload: AnswerCreationRequest = {
        content: content,
        questionId: questionId,
      };
      postAnswer(payload);
    }
    e.preventDefault();
  };
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <Answer data={answerData || []}/>
      </Suspense>
    <div className="my-10">
      {session.status != "unauthenticated" ? (
        <div>
          <div className="my-3">
            <h3 className="text-xl">Your Answer</h3>
            <div className="my-3 border-2">
              <Editor refer={ref} />
            </div>
            <div className="flex justify-start">
              <Button
                className={cn(
                  "w-fit"
                )}
                onClick={(e)=>{submitAnswer(e)}}
              >
                Post Your Answer
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
    </div>
  );
};

export default PostAnswer;
