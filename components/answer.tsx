import { FC } from "react";
import { Button } from "@/components/ui/button";
import EditorOutput from "./editoroutput";
import type { Answer } from "@prisma/client";
interface AnswerProps {
  data: Answer[];
}

const Answer: FC<AnswerProps> = ({ data }: AnswerProps) => {
  return (
    <div>
      {data.map((answer) => (
        <div className="flex flex-col my-3" key={answer.id}>
          <div className="flex gap-2">
            <div className="w-fit">
              <span className="text-xs text-zinc-500">{data.length} votes</span>
            </div>
          </div>
          <div>
            <EditorOutput content={answer.content} />
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Answer;
