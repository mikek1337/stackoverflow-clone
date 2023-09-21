"use client";
import { FC, Suspense } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserAvatar } from "./useravatar";
import Loading from "@/app/loading";
import type { PostedQuestion, QuestionDetail } from "@/types/db";
interface questionsProps {
  questionType: string;
}

const Questions: FC<questionsProps> = ({ questionType, ...props }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const { data } = await axios.get("/api/question");
      return data as QuestionDetail[];
    },
  });
  if (data?.length == 0)
    return (
      <div className="w-full">
        <p className="text-zinc-300 text-center text-xl">No Questions</p>
      </div>
    );
  return (
    <div className="md:container border-2">
      {data?.map((value) => (
        <Suspense fallback={<Loading />} key={value.id}>
          <hr className="my-10 md:my-2" />
          <div className="flex flex-col md:flex-row px-2 md:px-0 justify-center items-center md:pr-10 border-2 w-full md:w-fit ">
            <div className="flex md:flex-col my-3 md:my-0   items-center  text-zinc-300 md:w-24 md:text-sm text-xs gap-1">
              <span className="text-zinc-800">{value.votes.length} votes</span>
              <span>{value.answers.length} answers</span>
              <span>3 views</span>
            </div>
            <div className="flex flex-col w-full">
              <Link
                href={`questions/${value.id}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-left w-fit text-blue-500 text-lg"
                )}
              >
                <div className="overflow-hidden w-auto border-2">
                  <p className="whitespace-pre-line">{value.title}</p>
                </div>
              </Link>
              <div className="flex justify-between  px-5 w-full mt-5">
                <div className="w-fit ">
                  <Badge
                    variant="outline"
                    className="bg-blue-100 w-fit  text-xs px-2 py-0 font-thin text-blue-600"
                  >
                    {value.tags}
                  </Badge>
                </div>
              </div>
              <div className="w-fit self-end md:p-0 p-4">
                <div className="w-fit flex items-center gap-1 -mr-3">
                  <UserAvatar
                    user={value.user}
                    width="10"
                    height="10"
                    className="w-[30px] h-[30px] rounded-md object-cover"
                  />
                  <span className="text-xs">{value.user.username}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400">
                    asked {formatTimeToNow(new Date(value.postedDate))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      ))}
    </div>
  );
};

export default Questions;
