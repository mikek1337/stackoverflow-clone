import SideMenu from "@/components/sidemenu";
import EditorOutput from "@/components/editoroutput";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/useravatar";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "@/app/loading";
import PostAnswer from "@/components/postanswer";
import PostVote from "@/components/postvote";
import AddQuestion from "@/components/addquestion";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import Comment from "@/components/comment";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import ProgressBar from "@/components/progress";
import { Recommendation } from "@/components/recommendation";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession();
  const data = await db.question.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      votes: true,
      user: true,
      QuestionComment: {
        include: {
          user: true,
        },
        orderBy: {
          postedDate: "asc",
        },
      },
      answers: {
        include: {
          user: true,
          votes: true,
          AnswerComment: {
            include: {
              user: true,
            },
            orderBy: {
              postedDate: "asc",
            },
          },
        },
      },
    },
  });
  let questionvoteAmt: number = 0;
  let questioncurrentVote = data?.votes.find(
    (vote) => vote.userId === session?.user.id
  )?.type;
  questionvoteAmt =
    data?.votes.reduce((acc: number, vote) => {
      if (vote.type === "DOWN") return acc - 1;
      if (vote.type === "UP") return acc + 1;
      return acc;
    }, 0) || 0;
  return (
    <div>
     
    <Suspense fallback={<ProgressBar>Please wait!</ProgressBar>}>
      <div className="flex flex-row px-10">
        <div className="md:container ">
          <div className="w-full">
            <div className="flex flex-col">
              <div className="flex md:flex-row flex-col md:items-center md:justify-between mt-2 ">
                <div className="">
                  <p className="md:text-3xl text-xl text-zinc-500">
                    {data?.title}
                  </p>
                </div>
                <div className="md:self-start md:w-auto w-fit">
                  <AddQuestion />
                </div>
              </div>
              <div className="flex gap-2 text-sm my-2">
                <span className="w-fit">
                  Asked{" "}
                  {data?.postedDate &&
                    formatTimeToNow(new Date(data.postedDate))}
                </span>

                <span className="w-fit">Modified today</span>
                <span className="w-fit">viewed 2 times</span>
              </div>
            </div>
            <hr />
            <div className="my-3 flex">
              <div className="w-fit h-full">
                <div>
                  <PostVote
                    postId={data?.id || ""}
                    postedContent="question"
                    initialVote={questioncurrentVote}
                    initialVoteAmt={questionvoteAmt}
                  />
                </div>
              </div>
              <div className="md:w-full w-[300px]">
                <EditorOutput content={data?.problemDetail} />
                <EditorOutput content={data?.triedMethods} />
                <div className="flex my-6 gap-2">
                  {data?.tags.split(",").map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-blue-100 w-fit text-xs px-2 py-0 font-normal text-blue-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-full w-[300px]"></div>
            <div className="rounded-md bg-blue-100 w-fit float-right pr-5 pl-1">
              <span className="text-zinc-400 text-xs py-1">
                {" "}
                Asked{" "}
                {data?.postedDate && new Date(data.postedDate).toDateString()}
              </span>
              <div className="flex items-center gap-2 my-1">
                <UserAvatar
                  user={data?.user ?? { name: null, image: null }}
                  className="rounded-md w-[40px] h-[40px]"
                />
                <span className="text-xs">{data?.user.username}</span>
              </div>
            </div>
          </div>
          <div className="my-10">
            <Comment
              contentId={data?.id || ""}
              type="question"
              comments={data?.QuestionComment || []}
            />
          </div>
          <div>
            <div className="my-3 flex justify-between">
              <h2 className="text-zinc-600 text-xl">
                {data?.answers.length} Answers
              </h2>
            </div>
            <div>
              <PostAnswer
                questionId={params.slug}
                answerData={data?.answers || []}
                isOwner={data?.user.id === session?.user.id}
              />
            </div>
          </div>
        </div>
        <Recommendation id={data?.id}/>
      </div>
    </Suspense>
          
    </div>
  );
}
