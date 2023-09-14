"use client";
import { FC } from "react";
import Link from "next/link";
import Questions from "@/components/questions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import SideMenu from "@/components/sidemenu";

const page: FC = () => {
  return (
    <div className="flex flex-row">
      <SideMenu />
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
            <TabsList className="w-[300px] float-right mb-10">
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
