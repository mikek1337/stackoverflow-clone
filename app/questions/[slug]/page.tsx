import SideMenu from "@/components/sidemenu";
import EditorOutput from "@/components/editoroutput";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/useravatar";
import { formatTimeToNow } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "@/app/loading";
import PostAnswer from "@/components/postanswer";
import PostVote from "@/components/postvote";
import AddQuestion from "@/components/addquestion";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession();
  const data = await db.question.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      votes: true,
      user: true,
      answers:{
        include:{
          user:true,
          votes:true
        }
      }
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
    <Suspense fallback={<Loading />}>
      <div className="flex flex-row">
        <SideMenu />
        <div className="md:container">
          <div className="">
            <div className="flex flex-col">
              <div className="flex md:flex-row flex-col md:items-center mt-2">
                <div className="w-full">
                  <h4 className="md:text-3xl text-xl text-zinc-500">{data?.title}</h4>
                </div>
                <div className="place-self-end">
                  <AddQuestion/>
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
              <div className="w-fit">
                <div>
                  <PostVote
                    postId={data?.id || ""}
                    postedContent="question"
                    initialVote={questioncurrentVote}
                    initialVoteAmt={questionvoteAmt}
                  />
                </div>
              </div>
              <div className="w-full">
                <EditorOutput content={data?.problemDetail} />
              </div>
            </div>
            <div>
              <EditorOutput content={data?.triedMethods} />
            </div>
            <div className="flex">
              <Badge
                variant="outline"
                className="bg-blue-100 w-fit text-xs px-2 py-0 font-thin text-blue-600"
              >
                {data?.tags}
              </Badge>
            </div>
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
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
