"use client"
import { FC, Suspense } from "react";
import Answer from "./answer";
import { AnswerDetail } from "@/types/db";
import Loading from "@/app/loading";
import AnswerForm from "./answerform";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import {useSession} from "next-auth/react"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { AnswerProvider } from "./answerprovider";
interface PostAnswerProps {
  questionId: string;
  isOwner: boolean;
}

const PostAnswer: FC<PostAnswerProps> =  ({
  questionId,
  isOwner,
}: PostAnswerProps) => {
  const session =  useSession();
  const {data, isLoading} = useQuery({
    queryKey:['question-answer', questionId ],
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
    <AnswerProvider initialState={data}>
      <Answer
        questionOwner={isOwner}
        questionId={questionId}
        userId={session?.data?.user.id || ""}
      />
      {session?.data?.user && <AnswerForm questionId={questionId} />}
      {!session?.data?.user && (
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-fit mb-4")}
          href="/login"
        >
          Login to answer
        </Link>
      )}
   </AnswerProvider>
  );
};

export default PostAnswer;
