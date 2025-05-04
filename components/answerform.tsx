"use client";
import { FC, useEffect, useRef } from "react";
import Editor from "./editor";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { AnswerCreationRequest } from "@/lib/validators/post";
import { useMutation } from "@tanstack/react-query";
import EditorJS from "@editorjs/editorjs";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useAnswerReducer from "./answerprovider";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { Actions } from "@/store/answers-store";
interface answerformProps {
  questionId: string;
}

const AnswerForm: FC<answerformProps> = ({ questionId }: answerformProps) => {
  const router = useRouter();
  const {dispatch} = useAnswerReducer();
  const session = useSession();
  const ref = useRef<EditorJS>();
  const { mutate: postAnswer, isSuccess, isError } = useMutation({
    mutationFn: async ({ content, questionId }: AnswerCreationRequest) => {
      const payload: AnswerCreationRequest = {
        content,
        questionId,
      };
      const { data } = await axios.post("/api/answer/post", payload);
      return data;
    }
  });

  useEffect(()=>{
    if(isSuccess){
      toast({
        title: "Answer posted",
        variant: "default",
      });
      router.refresh();
      ref.current?.clear();
    }
    if(isError){
      
        toast({
          title: "Something went wrong",
          description: "your answer was not posted. Please try again.",
          variant: "destructive",
        });
    }
  },[isSuccess, isError])

  const submitAnswer = async (e: any) => {
    const content = await ref.current?.save();
    dispatch({type:Actions.ADD, payload:{content:content,id:nanoid(),isAi:false,isAnswer:false,postedDate:new Date().toString(),user:{username:session.data?.user.username || "", image:session.data?.user.image || ""}, votes:[]}})
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
      <div className="my-10">
        <div>
          <div className="my-3">
            <h3 className="text-xl">Your Answer</h3>
            <div className="my-3 border-2 px-5">
              <Editor refer={ref} />
            </div>
            <div className="flex justify-start">
              <Button
                className={cn("w-fit")}
                onClick={(e) => {
                  submitAnswer(e);
                }}
              >
                Post Your Answer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerForm;
