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
  if (isLoading) return <Loading />;
  return (
    <div className="md:container">
      {data?.map((value) => (
        <Suspense fallback={<Loading />} key={value.id}>
          <hr className="my-10" />
          <div className="flex md:flex-row flex-col justify-center md:items-center md:pr-10 gap-3">
            <div className="flex md:flex-col flex-row text-zinc-300 md:w-24 w-fit  md:text-sm text-xs gap-3 px-2">
              <span className="text-zinc-800">
                {value.votes.length}&nbsp;votes
              </span>
              <p className="">{value.answers.length}&nbsp;answers</p>
              <span>3&nbsp;views</span>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-3 flex-col ">
                <Link
                  href={`questions/${value.id}`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "w-fit text-blue-500 md:text-lg text-xs"
                  )}
                >
                  {value.title}
                </Link>
                <div className="ml-5 md:w-[600px] w-[300px] line-clamp-2">
                  <p className="md:text-sm text-xs">
                    {
                      value.problemDetail.blocks.find(
                        (val) => val.type === "paragraph"
                      )?.data.text
                    }
                  </p>
                </div>
              </div>
              <div className="flex justify-between  px-5 w-full mt-5">
                <div className="w-fit">
                  <Badge
                    variant="outline"
                    className="bg-blue-100 w-fit text-xs px-2 py-0 font-thin text-blue-600"
                  >
                    {value.tags}
                  </Badge>
                </div>
              </div>
              <div className="w-fit self-end">
                <div className="w-fit flex items-center gap-1 -mr-15">
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
