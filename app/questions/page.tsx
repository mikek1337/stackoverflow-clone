"use client";
import { FC } from "react";
import Questions from "@/components/questions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import SideMenu from "@/components/sidemenu";
import AddQuestion from "@/components/addquestion";

const page: FC = () => {
  return (
    <div className="w-full">
      <div className="">
        <div className="flex flex-row justify-between py-5">
          <h1 className="text-2xl md:text-4xl">Top Questions</h1>
          <AddQuestion />
        </div>
        <div className="my-5">
          <Tabs defaultValue="hot">
            <TabsList className="w-[300px] float-right md:mb-10  mb-3">
              <TabsTrigger value="hot">hot</TabsTrigger>
              <TabsTrigger value="new">Today</TabsTrigger>
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
