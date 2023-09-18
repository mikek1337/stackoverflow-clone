import { FC, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditorOutput from "./editoroutput";
import type { Answer, VoteType } from "@prisma/client";
import PostVote from "./postvote";
import { AnswerDetail, QuestionDetail } from "@/types/db";
import { UserAvatar } from "./useravatar";
import { formatTimeToNow } from "@/lib/utils";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
interface AnswerProps {
  data: AnswerDetail[];
}

const Answer: FC<AnswerProps> = ({ data }: AnswerProps) => {
  const session = useSession();
  const [answerVoteAmt, setAnswerVoteAmt] = useState<number>(0);
  const [answerCurrentVote, setAnswerCurrentVote] = useState<VoteType>();
  useEffect(() => {
    data.map((answer) => {
      answer.votes.map((vote) => {
        vote.type == "DOWN"
          ? setAnswerVoteAmt((prev) => prev - 1)
          : setAnswerVoteAmt((prev) => prev + 1);
      });
      if (session.status == "authenticated")
        setAnswerCurrentVote(
          answer.votes.find((value) => value.userId == session.data.user.id)
            ?.type
        );
    });
  }, [data]);
  return (
    <Suspense fallback={<Loading />}>
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
            <div className="w-fit">
              <PostVote
                postId={answer.id}
                postedContent="answer"
                initialVoteAmt={answerVoteAmt}
                initialVote={answerCurrentVote}
              />
            </div>
            <div>
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
        </div>
      ))}
    </Suspense>
  );
};

export default Answer;
