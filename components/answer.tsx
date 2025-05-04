"use client"
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
import { Icons } from "./icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { AnswerProvider } from "./answerprovider";
import RenderAnswer from "./renderanswers";

interface AnswerProps {
  questionId: string;
  userId: string;
  questionOwner: boolean;
}

const Answer: FC<AnswerProps> = ({
  questionId,
  userId,
  questionOwner,
}: AnswerProps) => {
  return (
     <RenderAnswer questionOwner/>
  );
};

export default Answer;
