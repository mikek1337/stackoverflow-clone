"use client";
import { FC } from "react";
import { Checkbox } from "./ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
interface CheckAnswerProps {
  answerId: string;
  checked: boolean;
}
const CheckAnswer: FC<CheckAnswerProps> = ({
  checked,
  answerId,
}: CheckAnswerProps) => {
  const { mutate: updateAnswer } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/api/answer/patch?q=${answerId}`);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "update completed",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "something went wrong. Please try again!",
        variant: "destructive",
      });
    },
  });
  const onChecked = () => {
    updateAnswer();
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox onCheckedChange={onChecked} checked={checked} />
        <label htmlFor="check" className="text-xs w-fit">
          Check as answer
        </label>
      </div>
    </div>
  );
};

export default CheckAnswer;
