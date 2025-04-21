"use client"
import Loading from "@/app/loading";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";
import { FC, Suspense, useEffect, useState } from "react";
import AddComment from "./addcomment";
import AddAnswerComment from "./addanswercomment";
import { getAuthSession } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnswerCommentWithUser, CommentState, QuestionCommentWithUser } from "@/types/comment";
import RenderComment from "./rendercomment";
import { CommentProvider } from "./commentprovider";
import { Skeleton } from "./ui/skeleton";
interface CommentProps {
  contentId: string;
  type: "question" | "answer";
 
}
const Comment: FC<CommentProps> = ({
  contentId,
  type,
}: CommentProps) => {
  const session = useSession();
  const [currentComments, setCurrentComments] = useState<any[]>([]);
  const {data, isLoading} = useQuery({
    queryKey:[contentId],
    queryFn:async()=>{
      const res = await axios.get(`/api/comment?contentId=${contentId}&contentType=${type}`);
      return res.data as CommentState[]
    }
  })
  useEffect(()=>{
    if(data){
      setCurrentComments(data);
    }
  },[data])
  return (
    <>
    {isLoading && (
      <div>
        <Skeleton className="w-full h-20 animate-pulse rounded-md"/>
        <Skeleton className="w-full h-20 animate-pulse rounded-md"/>
        <Skeleton className="w-full h-20 animate-pulse rounded-md"/>
        <Skeleton className="w-full h-20 animate-pulse rounded-md"/>
      </div>
    )}
    {data && 
      <CommentProvider initalState={data || []}>
        <RenderComment/>
        {type === "question" && (
          <AddComment questionId={contentId} userId={session?.data?.user.id || ""} username={session.data?.user.username || session.data?.user.name || ""} />
        )}
        {type === "answer" && (
          <AddAnswerComment
            username={session.data?.user.username || session.data?.user.name || ""}
            answerId={contentId}
            userId={session?.data?.user.id || ""}
          />
        )}
        </CommentProvider>
    
    }
    </>
  );
};

export default Comment;
