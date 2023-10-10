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
import { Skeleton } from "./ui/skeleton";
import ProgressBar from "./progress";
import { Question } from "@prisma/client";

interface questionsProps {
  questionType: string;
}

const Questions: FC<questionsProps> = ({ questionType, ...props }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      let data: QuestionDetail[] = [];
      if (questionType == "all") {
        data = (await axios.get("/api/question")).data;
      } else if (questionType == "new") {
        data = (await axios.get("/api/question/get?q=new")).data;
      } else if (questionType == "week") {
        data = (await axios.get("/api/question/get?q=week")).data;
      } else {
        data = (await axios.get("/api/question/get?q=month")).data;
      }
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div className="md:container">
      {data?.length === 0 ? (
        <div className="w-full container my-auto">
          <p className="text-zinc-300 text-center md:text-xl text-sm ">
            No Questions
          </p>
        </div>
      ) : null}
      {data?.map((value) => (
        <>
          <hr className="my-2" />
          <div
            key={value.id}
            className="flex md:flex-row flex-col justify-center md:items-start md:pr-10 gap-3"
          >
            <div className="flex md:flex-col flex-row text-zinc-300 md:w-24 w-fit  md:text-sm text-xs gap-1 items-center px-2">
              <span className="text-zinc-800">
                {value.votes.length}&nbsp;votes
              </span>
              <p
                className={
                  value.answers.find((answer) => answer.isAnswer)?.isAnswer
                    ? "bg-green-600 text-white font-bold px-2 rounded-md"
                    : ""
                }
              >
                {value.answers.length}&nbsp;answers
              </p>
              <span>3&nbsp;views</span>
            </div>
            <div className="flex flex-col">
              <div className="flex  flex-col ">
                <Link
                  href={`questions/${value.id}`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "w-fit text-blue-500 md:text-lg text-xs"
                  )}
                >
                  {value.title}
                </Link>
                <div className="ml-5 md:w-[700px] w-[300px] line-clamp-2">
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
                <div className="w-fit flex gap-1">
                  {value.tags.split(",").map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-blue-100 w-fit text-xs px-5 py-0 font-thin text-blue-600"
                    >
                      {tag}
                    </Badge>
                  ))}
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
        </>
      ))}
    </div>
  );
};

export default Questions;
