"use client"
import { FC, Suspense } from "react";
import EditorOutput from "./editoroutput";
import type { Answer } from "@prisma/client";
import PostVote from "./postvote";
import { AnswerDetail } from "@/types/db";
import { UserAvatar } from "./useravatar";
import { formatTimeToNow } from "@/lib/utils";
import Loading from "@/app/loading";
import Comment from "./comment";
import CheckAnswer from "./checkanswer";
import { Icons } from "./icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

interface AnswerProps {
  questionId: string;
  userId: string;
  questionOwner: boolean;
}

const Answer: FC<AnswerProps> = ({
  questionId,
  userId,
  questionOwner,
}: AnswerProps) => {
  const {data, isLoading} = useQuery({
    queryKey:['question', questionId ],
    queryFn:async()=>{
      const res = await axios.get("/api/answer?q="+questionId);
      console.log(res);
      return res.data as AnswerDetail[];
    }
  })
  if(isLoading || !data){
    return(
      <div className="flex flex-col my-3">
          <div className="flex gap-2">
            <div className="w-fit">
              <span className="text-xs text-zinc-500">
                <Skeleton className="w-full h-10"/>
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="w-fit mb-5">
              <Skeleton className="w-10 h-10"/>
            </div>
          </div>
          <div className="w-fit float-right self-end my-3 p-3">
            <span className="text-zinc-400">
              <Skeleton className="w-full h-5"/>
            </span>
            <div className="flex items-center  gap-2">
              <div className="w-fit">
                <Skeleton className="rounded-md" />
              </div>
              <div className="w-fit">
                <span className="text-xs text-zinc-600">
                  <Skeleton className="w-full h-5"/>
                </span>
              </div>
            </div>
          </div>
          <hr />
          <Skeleton className="w-full h-20"/>
        </div>
    )
  }
  return (
    <>
      <span className="text-xs text-zinc-400 font-semibold">Answers: {data?.length}</span>
      {data?.map((answer) => (
        <div className="flex flex-col my-3" key={answer.id}>
          <div className="flex gap-2">
            <div className="w-fit">
              <span className="text-xs text-zinc-500">
                {answer.votes.length} votes
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="w-fit mb-5">
              <PostVote
                postId={answer.id}
                postedContent="answer"
                
                initialVote={
                  answer.votes.find((vote) => vote.userId === userId)?.type
                }
              />
              {questionOwner ? (
                <CheckAnswer checked={answer.isAnswer} answerId={answer.id} />
              ) : (
                answer.isAnswer && (
                  <Icons.check
                    className="items-center text-left text-green-600"
                    height="30"
                    width="30"
                  />
                )
              )}
            </div>
            <div className="md:w-full w-[300px]">
              {answer.isAi && <span className="text-lg font-extrabold my-3">AI generated</span>}
              <EditorOutput content={answer.content} />
            </div>
          </div>
          <div className="w-fit float-right self-end my-3 p-3">
            <span className="text-zinc-400">
              answered {formatTimeToNow(new Date(answer.postedDate))}{" "}
            </span>
            <div className="flex items-center  gap-2">
              <div className="w-fit">
                <UserAvatar user={answer.user} className="rounded-md" />
              </div>
              <div className="w-fit">
                <span className="text-xs text-zinc-600">
                  {answer.user.username}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <Comment
            contentId={answer.id}
            type="answer"
            
          />
        </div>
      ))}
    </>
  );
};

export default Answer;
