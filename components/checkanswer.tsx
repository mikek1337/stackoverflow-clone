"use client";
import { FC } from "react";
import { Checkbox } from "./ui/checkbox";
interface CheckAnswerProps {
  answerId: string;
  checked: boolean;
}
const CheckAnswer: FC<CheckAnswerProps> = ({
  checked,
  answerId,
}: CheckAnswerProps) => {
  const onChecked = () => {};
  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox onChange={onChecked} value={checked} />
        <label htmlFor="check" className="text-xs w-fit">
          Check as answer
        </label>
      </div>
    </div>
  );
};

export default CheckAnswer;
