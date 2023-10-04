import { FC } from "react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatTimeToNow } from "@/lib/utils";
import ProfileForm from "@/components/setting/profileform";

const page: FC = async ({}) => {
  const session = await getAuthSession();
  const questions = await db.question.findMany({
    where: {
      postedBy: session?.user.id,
    },
    include: {
      answers: true,
    },
  });
  return (
    <div className="h-[300px]">
      <h2 className="text-3xl">{questions.length} Questions</h2>
      <hr className="my-5" />
      <div className="border-2 border-zinc-200 rounded-md p-3 h-full my-3">
        {questions.map((question) => (
          <div key={question.id}>
            <Link href={`/questions/${question.id}`} className="text-blue-500">
              {question.title}
            </Link>
            <div className="flex gap-2">
              <span className="text-sm text-zinc-400 w-fit">
                {formatTimeToNow(new Date(question.postedDate))}
              </span>
              <span className="text-sm text-zinc-400 w-fit">
                Answers{": "}
                {question.answers.length}
              </span>
              <span className="text-sm text-zinc-400 w-fit">
                tags{": "}
                {question.tags}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
