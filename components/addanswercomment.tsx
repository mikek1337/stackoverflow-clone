"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import { CommentPostValidator } from "@/lib/validators/post";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
interface AddAnswerCommentProps {
  answerId: string;
  userId: string;
}

const AddAnswerComment: FC<AddAnswerCommentProps> = ({
  answerId,
  userId,
}: AddAnswerCommentProps) => {
  const [hide, setHide] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const { mutate: postComment } = useMutation({
    mutationFn: async ({ comment, questionId }: CommentPostValidator) => {
      setDisabled(true);
      const payload: CommentPostValidator = { comment, questionId, userId };
      const { data } = await axios.post("/api/comment/answer/post", payload);
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
    onSettled: () => {
      setDisabled(false);
    },
  });

  const onPost = () => {
    if (comment != "") {
      const commentPost: CommentPostValidator = {
        comment: comment,
        questionId: answerId,
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
          value={comment}
        />
        <div className="flex flex-row gap-2 justify-end">
          <Button className="w-fit" onClick={onPost} disabled={disabled}>
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

export default AddAnswerComment;
