"use client";
import { VoteType } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VotePostValidator } from "@/lib/validators/post";
import { Skeleton } from "./ui/skeleton";

interface postvoteProps {
  postId: string | undefined;
  initialVote: VoteType | undefined;
  postedContent: string;
}

const PostVote: FC<postvoteProps> = ({
  postId,
  initialVote,
  postedContent,
}: postvoteProps) => {
  const [currentVote, setCurrentVote] = useState<VoteType | undefined>();
  const [vote, setVote] = useState(0);
  const {data, isLoading} = useQuery({
      queryKey:["vote", postId, postedContent],
      queryFn: async ()=>{
        const res = await axios.get(`/api/vote/count?q=${postedContent}&postId=${postId}`);
        return res.data as {vote:number, userVote:{type:VoteType}};
      }
  })

  useEffect(()=>{
    if(data){
      setVote(data?.vote)
      setCurrentVote(data?.userVote?.type);
    }
   
  },[data])
 
  

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
        questionId: postId || "",
        voteType: voteType,
      };
      if (voteType == "DOWN") {
          if(vote == 1)
          {
            setVote(-1);
          }
          else{
            setVote((prev) => prev - 1);
          }
      } else {
        if(vote == -1){
          setVote(1);
        }
        else{
          setVote((perv) => perv + 1);
        }
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
        {isLoading?<Skeleton className="w-10 h-10 animate-pulse rounded-md"/>: (<ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />)}
        
      </Button>
      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        {isLoading?<Skeleton className="w-10 h-10 animate-pulse rounded-md"/>: vote}
        
      </div>
      <Button
        size="sm"
        variant="ghost"
        aria-label="downvote"
        onClick={() => {
          voteAction("DOWN");
        }}
      >
        {isLoading?<Skeleton className="w-10 h-10 animate-pulse rounded-md"/>: (<ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "DOWN",
          })}
        />)}
        
      </Button>
    </div>
  );
};

export default PostVote;
