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

interface PostAnswerProps {
  questionId: string;
  answerData: AnswerDetail[];
  isOwner: boolean;
}

const PostAnswer: FC<PostAnswerProps> = async ({
  questionId,
  answerData,
  isOwner,
}: PostAnswerProps) => {
  const session = await getAuthSession();
  return (
    <Suspense fallback={<Loading />}>
      <Answer
        questionOwner={isOwner}
        data={answerData || []}
        userId={session?.user.id || ""}
      />
      {session?.user && <AnswerForm questionId={questionId} />}
      {!session?.user && (
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-fit mb-4")}
          href="/login"
        >
          Login to answer
        </Link>
      )}
    </Suspense>
  );
};

export default PostAnswer;
