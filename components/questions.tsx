"use client";
import { FC, Suspense } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserAvatar } from "./useravatar";
import Loading from "@/app/loading";
import type { PostedQuestion } from "@/types/db";
interface questionsProps {
  questionType: string;
}

const Questions: FC<questionsProps> = ({ questionType, ...props }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const { data } = await axios.get("/api/question");
      console.log(data);
      return data as PostedQuestion[];
    },
  });
  return (
    <div className="container">
      {data?.map((value) => (
        <Suspense fallback={<Loading />} key={value.id}>
          <hr />
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-zinc-300 w-24 text-sm gap-1">
              <span className="text-zinc-800">0 votes</span>
              <span>0 answers</span>
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
                {value.title}
              </Link>
              <div className="flex justify-between  px-3 w-full">
                <div>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 w-fit text-xs px-2 py-0 font-thin text-blue-600"
                  >
                    {value.tags}
                  </Badge>
                </div>
                <div className="flex gap-1 items-center self-end w-fit">
                  <div className="w-10">
                    <UserAvatar
                      user={value.user}
                      width="50"
                      height="50"
                      className="w-10 h-10"
                    />
                  </div>
                  <span className="text-xs">{value.user.username}</span>
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
