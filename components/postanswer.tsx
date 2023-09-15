import { FC, useRef } from "react";
import { Button } from "@/components/ui/button";
import Editor from "./editor";
import EditorJS from "@editorjs/editorjs";
import EditorOutput from "./editoroutput";
import { useSession } from "next-auth/react";
const PostAnswer: FC = async () => {
  const session = useSession();
  const ref = useRef<EditorJS>();
  return (
    <div>
      <div>
        {session && (
          <div className="my-3">
            <h3 className="text-xl">Your Answer</h3>
            <div className="my-3">
              <Editor refer={ref} />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary">Post Your Answer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAnswer;
