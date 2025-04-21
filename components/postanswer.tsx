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
interface PostAnswerProps {
  questionId: string;
  isOwner: boolean;
}

const PostAnswer: FC<PostAnswerProps> =  ({
  questionId,
  isOwner,
}: PostAnswerProps) => {
  const session =  useSession();
  return (
    <>
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
    </>
  );
};

export default PostAnswer;
