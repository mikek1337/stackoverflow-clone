"use client";
import { VoteType } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { VotePostValidator } from "@/lib/validators/post";

interface postvoteProps {
  postId: string;
  initialVoteAmt: number;
  initialVote: VoteType | undefined;
  postedContent: string;
}

const PostVote: FC<postvoteProps> = ({
  postId,
  initialVoteAmt,
  initialVote,
  postedContent,
}: postvoteProps) => {
  const [currentVote, setCurrentVote] = useState(initialVote);
  const [vote, setVote] = useState(initialVoteAmt);
  const { mutate: postVote } = useMutation({
    mutationKey: ["vote"],
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
      if (currentVote == "DOWN") {
        setVote((prev) => prev + 1);
      } else {
        setVote((perv) => perv - 1);
      }
    },
    onSuccess: () => {},
  });

  const voteAction = (voteType: VoteType) => {
    if (currentVote != voteType) {
      const payload: VotePostValidator = {
        questionId: postId,
        voteType: voteType,
      };
      if (voteType == "DOWN") {
        setVote((prev) => prev - 1);
      } else {
        setVote((perv) => perv + 1);
      }
      setCurrentVote(voteType);
      postVote(payload);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm-gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        size="sm"
        variant="ghost"
        aria-label="upvote"
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
        aria-label="downvote"
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
