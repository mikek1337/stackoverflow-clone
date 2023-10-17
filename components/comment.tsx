import Loading from "@/app/loading";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";
import { FC, Suspense } from "react";
import AddComment from "./addcomment";
import AddAnswerComment from "./addanswercomment";
import { getAuthSession } from "@/lib/auth";
interface CommentProps {
  contentId: string;
  type: "question" | "answer";
  comments: any[];
}
const Comment: FC<CommentProps> = async ({
  contentId,
  type,
  comments,
}: CommentProps) => {
  /* let comments: any[] = []; */
  const session = await getAuthSession();
  /* const session = await getAuthSession();
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
    }); */

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
      {type === "question" && (
        <AddComment questionId={contentId} userId={session?.user.id || ""} />
      )}
      {type === "answer" && (
        <AddAnswerComment
          answerId={contentId}
          userId={session?.user.id || ""}
        />
      )}
    </Suspense>
  );
};

export default Comment;
