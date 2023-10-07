"use client";
import Highlight from "react-highlight";
import "highlight.js/styles/atom-one-light.css";
function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="rounded-md p-4 whitespace-pre  overflow-auto max-h-[400px]">
      <Highlight className="text-sm w-[600px] h-[100px]">{data.code}</Highlight>
    </pre>
  );
}

export default CustomCodeRenderer;
