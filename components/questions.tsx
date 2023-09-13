import { FC, use } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserAvatar } from "./useravatar";
interface questionsProps {
  questionType: string;
}

const Questions: FC<questionsProps> = ({ questionType, ...props }) => {
  return (
    <div className="container">
      <div className="flex justify-center items-center">
        <div className="flex flex-col text-zinc-300 w-24 text-xs gap-1">
          <span>0 votes</span>
          <span>0 answers</span>
          <span>3 views</span>
        </div>
        <div className="flex flex-col ">
          <Link
            href="/questions/1"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-left w-fit text-blue-500"
            )}
          >
            question title
          </Link>
          <div className="flex justify-between items-center px-3">
            <Badge variant="outline" className="bg-blue-100 w-fit text-sm ">
              tag
            </Badge>
            <UserAvatar user={{ name: "name", image: "" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
