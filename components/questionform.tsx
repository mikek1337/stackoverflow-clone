"use client";
import { PostValidator } from "@/lib/validators/post";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Editor from "./editor";
type formData = z.infer<typeof PostValidator>;
const QuestionForm = () => {
  const [mounted, setMounted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      problemDetail: null,
      triedMethods: null,
      tags: "",
    },
  });

  const problemRef = useRef<EditorJS>();
  const triedRef = useRef<EditorJS>();
  const _titleRef = useRef<HTMLElement>();
  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Error",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);
  useEffect(() => {
    const init = async () => {
      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };
    if (mounted) init();

    return () => {
      problemRef.current?.destroy();
      problemRef.current = undefined;
    };
  }, [mounted]);

  if (!mounted) return null;
  const submit = (data: formData) => {
    const { title, tags } = data;
    const problemDetail = problemRef.current?.save();
    console.log(title);
  };

  const { ref: titleRef, ...rest } = register("title");
  return (
    <div className="my-10">
      <form onSubmit={handleSubmit(submit)} id="submit-question">
        <div className="flex flex-col border-2 rounded-md p-4 w-fit">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <span className="text-xs">
            Be specific and imagine youre asking a question to another person.
          </span>
          <div className="w-[811px] mt-3">
            <Input
              className="w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none"
              id="title"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              ref={(e) => {
                titleRef(e);
                // @ts-ignore
                _titleRef.current = e;
              }}
              {...rest}
            />
            <span
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-fit mt-5 cursor-pointer"
              )}
            >
              Next
            </span>
          </div>
        </div>
        <div className="border-2 rounded-md p-4  mt-5 w-fit">
          <div className="flex flex-col">
            <label htmlFor="problemDetail" className="font-semibold">
              What are the details of your problem?
            </label>
            <span className="text-xs">
              Introduce the problem and expand on what you put in the title
            </span>
          </div>
          <div className="mt-5 w-[811px]">
            <Editor refer={problemRef} id="problemDetail" />
          </div>
        </div>
        <div className="border-2 rounded-md p-4  mt-5 w-fit">
          <div className="flex flex-col">
            <label htmlFor="triedMethods" className="font-semibold">
              What did you try and what did you expecting?
            </label>
            <span className="text-xs">
              Describe what you tried, what you expected to happen, and what
              actually resulted.
            </span>
          </div>
          <div className=" mt-5 w-[811px]">
            <Editor refer={triedRef} id="triedMethods" />
          </div>
        </div>
        <div className="flex flex-col border-2 rounded-md p-4 w-fit mt-5">
          <label htmlFor="title" className="font-semibold">
            Tags
          </label>
          <span className="text-xs">
            Add up to 5 tags to describe what your question is about.
          </span>
          <div className="w-[811px] mt-3">
            <Input
              className="w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none"
              id="tag"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
          </div>
          <Button
            type="submit"
            form="submit-question"
            className="w-fit float-right mt-3"
          >
            submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
