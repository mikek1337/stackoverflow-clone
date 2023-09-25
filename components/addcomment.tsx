"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CommentPostValidator } from "@/lib/validators/post";
import { toast } from "@/hooks/use-toast";
interface AddCommentProps {
  questionId: string;
}

const AddComment: FC<AddCommentProps> = ({ questionId }) => {
  const [hide, setHide] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const { mutate: postComment } = useMutation({
    mutationFn: async ({ comment, questionId }: CommentPostValidator) => {
      const payload: CommentPostValidator = { comment, questionId };
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
      };
      postComment(commentPost);
    }
  };
  return (
    <div>
      <Button
        className="w-fit text-zinc-500"
        variant="link"
        hidden={!hide}
        onClick={() => setHide(false)}
      >
        Add comment
      </Button>
      <div hidden={hide}>
        <TextareaAutosize
          placeholder="add comment"
          className="text-lg px-2 h-20 border-b-2 focus:outline-none"
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex flex-row">
          <Button className="w-fit" onClick={onPost}>Post</Button>
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
