
import { FC, Suspense} from "react";
import Answer from "./answer";
import { AnswerDetail } from "@/types/db";
import Loading from "@/app/loading";
import AnswerForm from "./answerform";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface PostAnswerProps {
  questionId: string;
  answerData: AnswerDetail[];
}

const PostAnswer: FC<PostAnswerProps> = async ({
  questionId,
  answerData,
}: PostAnswerProps) => {
  const session = await getAuthSession();
  return (
      <Suspense fallback={<Loading />}>
        <Answer data={answerData || []} userId={session?.user.id || ""}/>
        {session?.user && <AnswerForm questionId={questionId}/> }
        
      </Suspense>
  );
};

export default PostAnswer;
