'use client'
import { FC, useRef } from "react";
import Editor from "./editor";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { AnswerCreationRequest } from "@/lib/validators/post";
import { useMutation } from "@tanstack/react-query";
import EditorJS from "@editorjs/editorjs";
import { cn } from "@/lib/utils";
interface answerformProps {
  questionId: string;
}

const AnswerForm: FC<answerformProps> = ({ questionId }: answerformProps) => {
  const ref = useRef<EditorJS>();
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
    onSuccess: () => {
      toast({
        title: "Answer posted",
        variant: "default",
      });
    },
  });

  const submitAnswer = async (e: any) => {
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
      <div className="my-10">
        <div>
          <div className="my-3">
            <h3 className="text-xl">Your Answer</h3>
            <div className="my-3 border-2">
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
