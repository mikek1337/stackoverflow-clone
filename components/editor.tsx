import EditorJS from "@editorjs/editorjs";
import { FC, useCallback, forwardRef } from "react";
import "@/styles/editor.css";

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
                  // upload to uploadthing const [res] = await uploadFiles([file], "imageUploader");
                  console.log(file);
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
