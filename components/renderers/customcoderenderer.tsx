"use client";
import Highlight from "react-highlight";
import "highlight.js/styles/atom-one-light.css";
import { Fira_Code } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Fira_Code({
  subsets: ["latin"],
});
function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="rounded-md p-4 whitespace-pre  overflow-auto max-h-[400px]">
      <Highlight className={cn("text-sm w-[600px]", inter.className)}>
        {data.code}
      </Highlight>
    </pre>
  );
}

export default CustomCodeRenderer;
