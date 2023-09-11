"use client";
import EditorJS from "@editorjs/editorjs";
import { FC, useCallback } from "react";
import "@/styles/editor.css";
import { uploadFiles } from "@/lib/uploadthings";

interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {
  refer: React.MutableRefObject<EditorJS | undefined>;
}

const Editor: FC<EditorProps> = ({ refer, ...props }: EditorProps) => {
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!refer.current) {
      const editor = new EditorJS({
        holder: props.id || "editor",
        onReady() {
          refer.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles({
                    endpoint: "imageUploader",
                    files: [file],
                  });
                  return {
                    success: 1,
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [refer, props.id]);
  initializeEditor();
  return <div id={props.id || "editor"} className="focus:border-2 w-auto" />;
};

export default Editor;
