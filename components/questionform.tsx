"use client";
import { PostValidator, PostCreationRequest } from "@/lib/validators/post";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Editor from "./editor";
import axios from "axios";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";
type FormData = z.infer<typeof PostValidator>;
const QuestionForm = () => {
  const [mounted, setMounted] = useState(false);
  const [tags, setTags] = useState<string[]>([]); //[{id:1, name: "tag1"}, {id:2, name: "tag2"}
  const pathname = usePathname();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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
  const _tagsRef = useRef<HTMLElement>();

  const { mutate: postQuestion, isLoading } = useMutation({
    mutationFn: async ({
      title,
      problemDetail,
      tags,
      triedMethods,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        title,
        problemDetail,
        triedMethods,
        tags,
      };
      const { data } = await axios.post("/api/question/post", payload);

      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong!",
        description: "your question was not posted. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);
      router.refresh();
      return toast({
        description: "Your question is posted",
      });
    },
  });
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

  async function onSubmit(data: FormData) {
    const problemDetailBlocks = await problemRef.current?.save();
    const triedMethodsBlocks = await triedRef.current?.save();
    const title = data.title;
    const tagString = tags.join(",");

    const payload: PostCreationRequest = {
      title: title,
      tags: tagString,
      triedMethods: triedMethodsBlocks,
      problemDetail: problemDetailBlocks,
    };

    postQuestion(payload);
  }

  const onKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget?.value === "") return;
      if (tags.length >= 5)
        return toast({
          title: "Error",
          description: "You can only add up to 5 tags",
          variant: "destructive",
        });
      setTags([...tags, e.currentTarget?.value]);
      e.currentTarget.value = "";
    }
  };
  const { ref: titleRef, ...rest } = register("title");
  return (
    <div className="my-10">
      <form onSubmit={handleSubmit(onSubmit)} id="submit-question">
        <div className="flex flex-col border-2 rounded-md p-4 w-fit">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <span className="text-xs">
            Be specific and imagine youre asking a question to another person.
          </span>
          <div className="md:w-[811px] mt-3">
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
          <div className="mt-5 md:w-[811px] ">
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
          <div className=" mt-5 md:w-[811px]">
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
          <div className="md:w-[811px] mt-3 ">
            <div className="border-2 overflow-hidden my-6 flex flex-wrap gap-2 ">
              {tags.map((tag, index) => (
                <Badge
                  variant="default"
                  className="w-fit flex gap-2 px-2"
                  key={index}
                >
                  {tag}
                  <X
                    aria-label="close modal"
                    className="h-3 w-3 right "
                    id={index.toString()}
                    onClick={(e) => {
                      e.preventDefault();
                      setTags(tags.filter((tag, i) => i !== index));
                    }}
                  />
                </Badge>
              ))}
            </div>
            <Input
              className="w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none"
              id="tags"
              {...register("tags")}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              onKeyDown={(e) => {
                onKeyPressed(e);
              }}
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
