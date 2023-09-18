import { FC, Suspense } from "react";
import EditorOutput from "./editoroutput";
import type { Answer } from "@prisma/client";
import PostVote from "./postvote";
import { AnswerDetail } from "@/types/db";
import { UserAvatar } from "./useravatar";
import { formatTimeToNow } from "@/lib/utils";
import Loading from "@/app/loading";

interface AnswerProps {
  data: AnswerDetail[];
  userId:string;
  
}

const Answer: FC<AnswerProps> = ({ data, userId }: AnswerProps) => {

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
                initialVoteAmt={answer.votes.reduce((acc, vote)=>{
                  if (vote.type === "DOWN") return acc - 1;
                  if(vote.type === "UP") return acc + 1;
                  return acc
                },0)}
                initialVote={answer.votes.find((vote)=> vote.userId === userId)?.type}
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
