"use client";
import { FC } from "react";
import Link from "next/link";
import Questions from "@/components/questions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";

const page: FC = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[153px] h-[100vh] border-r-2 text-zinc-500 ">
        <div className="active:bg-slate-200 py-2 mt-4">
          <Link href="/">Home</Link>
        </div>
        <div>
          <div className="mt-1">
            <h6 className="">Public</h6>
          </div>
          <div className="ml-4 flex flex-col gap-2 py-3">
            <Link href="/questions" className="active:bg-zinc-200">
              Questions
            </Link>
            <Link href="/tags">Tags</Link>
            <Link href="/users">Users</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-row justify-between py-5">
          <h1 className="text-4xl">All Questions</h1>
          <Link
            className={cn(buttonVariants({ variant: "default" }), "w-[200px]")}
            href="/questions/ask"
          >
            Ask Question
          </Link>
        </div>
        <div className="w-full my-5">
          <Tabs defaultValue="hot">
            <TabsList className="w-[300px] float-right">
              <TabsTrigger value="hot">hot</TabsTrigger>
              <TabsTrigger value="new">interesting</TabsTrigger>
              <TabsTrigger value="week">Bountied</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
            <TabsContent value="hot">
              <Questions questionType="hot" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
