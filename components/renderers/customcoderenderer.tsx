"use client";

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="rounded-md p-4 whitespace-break-spaces md:whitespace-normal overflow-auto">
      <code className="text-sm w-[400px]">{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;
