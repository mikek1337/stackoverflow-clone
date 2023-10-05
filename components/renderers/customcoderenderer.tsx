"use client";

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="rounded-md p-4 whitespace-break-spaces  overflow-auto h-fit">
      <code className="text-sm w-[400px] h-[100px]">{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;
