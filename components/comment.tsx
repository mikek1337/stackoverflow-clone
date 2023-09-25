import Loading from "@/app/loading";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";
import { FC, Suspense } from "react";
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
      postedDate: "desc",
    },
  });
  return (
    <Suspense fallback={<Loading />}>
      {comments.map((comment) => (
        <div key={comment.id} className="flex">
          <p>{comment.comment}</p>
          <span>{comment.user.username} - </span>
          <span>{formatTimeToNow(new Date(comment.postedDate))}</span>
        </div>
      ))}
    </Suspense>
  );
};

export default Comment;
