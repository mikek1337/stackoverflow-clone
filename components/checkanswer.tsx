"use client";
import { FC, useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { CheckedState } from "@radix-ui/react-checkbox";
interface CheckAnswerProps {
  answerId: string;
  checked: boolean;
}
const CheckAnswer: FC<CheckAnswerProps> = ({
  checked,
  answerId,
}: CheckAnswerProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const { mutate: updateAnswer, isSuccess, isError } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/api/answer/patch?q=${answerId}`);
      return data;
    }
  });
  useEffect(()=>{
    if(isSuccess) toast({title:'Action Completed', description:'Answer checked', variant:'default'});
    if(isError) toast({title:'Error', description:'Something went wrong. Please try again!', variant:'destructive'});
  },[isSuccess, isError])
  const onChecked = (check: CheckedState) => {
    if (typeof check === "boolean"){
      checked = check;
      setIsChecked(check);
    } 
    updateAnswer();
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox onCheckedChange={onChecked} checked={isChecked} />
        <label htmlFor="check" className="text-xs w-fit">
          Check as answer
        </label>
      </div>
    </div>
  );
};

export default CheckAnswer;
