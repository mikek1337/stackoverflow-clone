import Loading from "@/app/loading";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";
import { FC, Suspense } from "react";
import AddComment from "./addcomment";
interface CommentProps {
  quesionId: string;
}
const Comment: FC<CommentProps> = async ({ quesionId }: CommentProps) => {
  const comments = await db.questionComment.findMany({
    where: {
      questionId: quesionId,
    },
    include: {
      user: true,
    },
    orderBy: {
      postedDate: "asc",
    },
  });
  return (
    <Suspense fallback={<Loading />}>
      {comments.map((comment) => (
        <div key={comment.id} className="text-xs ">
          <hr className="my-2" />
          <p className="w-full pl-10">{comment.comment}{" - "}{comment.user.username}{" "}{formatTimeToNow(new Date(comment.postedDate))}</p>
        </div>
      ))}
      <AddComment questionId={quesionId} />
    </Suspense>
  );
};

export default Comment;
