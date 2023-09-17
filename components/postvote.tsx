import { VoteType } from "@prisma/client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VotePostValidator } from "@/lib/validators/post";

interface postvoteProps {
  postId: string;
  initialVoteAmt: number;
  initialVote?: VoteType | null;
  postedContent: string;
}

const PostVote: FC<postvoteProps> = ({
  postId,
  initialVoteAmt,
  initialVote,
  postedContent,
}: postvoteProps) => {
  const [vote, setVote] = useState(initialVoteAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const { mutate: postVote } = useMutation({
    mutationKey:["vote"],
    mutationFn: async ({ questionId, voteType }: VotePostValidator) => {
      const payload: VotePostValidator = {
        questionId: questionId,
        voteType: voteType,
      };
      const { data } = await axios.post(
        `/api/vote/post?q=${postedContent}`,
        payload
      );
    },
    onError: () => {
   
    },
    onSuccess: () => {
      if (currentVote == "DOWN") {
        setVote((prev) => prev - 1);
      } else {
        setVote((perv) => perv + 1);
      }
    },
  });
  const voteAction = (voteType: VoteType) => {
    const payload: VotePostValidator = {
      questionId: postId,
      voteType: voteType,
    };
    setCurrentVote(voteType)
    postVote(payload);
  };
  console.log(currentVote);
  return (
    <div className="flex flex-col gap-4 sm-gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        size="sm"
        variant="ghost"
        aria-aria-label="upvote"
        onClick={() => {
          voteAction("UP");
        }}
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {vote}
      </p>
      <Button
        size="sm"
        variant="ghost"
        aria-aria-label="downvote"
        onClick={() => {
          voteAction("DOWN");
        }}
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
};

export default PostVote;
