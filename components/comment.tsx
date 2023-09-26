import Loading from "@/app/loading";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";
import { FC, Suspense } from "react";
import AddComment from "./addcomment";
import AddAnswerComment from "./addanswercomment";
interface CommentProps {
  contentId: string;
  type: "question" | "answer";
}
const Comment: FC<CommentProps> = async ({ contentId, type }: CommentProps) => {
  let comments: any[] = [];
  if (type === "question") {
    comments = await db.questionComment.findMany({
      where: {
        questionId: contentId,
      },
      include: {
        user: true,
      },
      orderBy: {
        postedDate: "asc",
      },
    });
  } else if (type === "answer") {
    comments = await db.answerComment.findMany({
      where: {
        answerId: contentId,
      },
      include: {
        user: true,
      },
      orderBy: {
        postedDate: "asc",
      },
    });
  }
  return (
    <Suspense fallback={<Loading />}>
      {comments.map((comment) => (
        <div key={comment.id} className="text-xs ">
          <hr className="my-2" />
          <p className="w-full pl-10">
            {comment.comment}
            {" - "}
            {comment.user.username}{" "}
            {formatTimeToNow(new Date(comment.postedDate))}
          </p>
        </div>
      ))}
      {type === "question" && <AddComment questionId={contentId} />}
      {type === "answer" && <AddAnswerComment answerId={contentId} />}
    </Suspense>
  );
};

export default Comment;
