"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CommentPostValidator } from "@/lib/validators/post";
import { toast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";
interface AddCommentProps {
  questionId: string;
  userId: string | "";
}

const AddComment: FC<AddCommentProps> = ({ questionId, userId }) => {
  const [hide, setHide] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const { mutate: postComment } = useMutation({
    mutationFn: async ({ comment, questionId }: CommentPostValidator) => {
      const payload: CommentPostValidator = { comment, questionId, userId };
      const { data } = await axios.post("/api/comment/question/post", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Your comment is not posted. Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setComment("");
      router.refresh();
      setHide(true);
      return toast({
        description: "Comment posted",
      });
    },
  });
  const onPost = () => {
    if (comment != "") {
      const commentPost: CommentPostValidator = {
        comment: comment,
        questionId: questionId,
        userId: userId,
      };
      postComment(commentPost);
    }
  };
  const addComment = () => {
    if (userId == "") {
      return toast({
        title: "Login to add comment",
        variant: "destructive",
      });
    }
    setHide(false);
  };
  return (
    <div>
      <Button
        className="w-fit text-zinc-500"
        variant="link"
        hidden={!hide}
        onClick={addComment}
      >
        Add comment
      </Button>
      <div hidden={hide}>
        <TextareaAutosize
          placeholder="add comment"
          className="text-lg px-2 h-20 border-b-2 focus:outline-none"
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex flex-row gap-2 justify-end">
          <Button className="w-fit" onClick={onPost}>
            Post
          </Button>
          <Button
            className="w-fit"
            variant="ghost"
            onClick={() => setHide(true)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
