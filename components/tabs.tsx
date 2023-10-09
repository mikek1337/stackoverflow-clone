"use client";
import Questions from "./questions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
const QuestionTabs = () => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="w-[300px] float-right md:mb-10  mb-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="new">Today</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Questions questionType="all" />
      </TabsContent>
    </Tabs>
  );
};

export default QuestionTabs;
