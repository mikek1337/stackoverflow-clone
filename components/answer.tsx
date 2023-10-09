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
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "./icons";

interface AnswerProps {
  data: AnswerDetail[];
  userId: string;
  questionOwner: boolean;
}

const Answer: FC<AnswerProps> = async ({
  data,
  userId,
  questionOwner,
}: AnswerProps) => {
  const session = await getAuthSession();
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
            <div className="w-fit mb-5">
              <PostVote
                postId={answer.id}
                postedContent="answer"
                initialVoteAmt={answer.votes.reduce((acc, vote) => {
                  if (vote.type === "DOWN") return acc - 1;
                  if (vote.type === "UP") return acc + 1;
                  return acc;
                }, 0)}
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
          <Comment contentId={answer.id} type="answer" />
        </div>
      ))}
    </Suspense>
  );
};

export default Answer;
