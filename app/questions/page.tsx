"use client";
import { FC } from "react";
import Questions from "@/components/questions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import SideMenu from "@/components/sidemenu";
import AddQuestion from "@/components/addquestion";

const page: FC = () => {
  return (
    <div className="flex flex-row">
      <SideMenu />
      <div className="container">
        <div className="flex flex-row justify-between py-5">
          <h1 className="text-4xl">All Questions</h1>
          <AddQuestion />
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
