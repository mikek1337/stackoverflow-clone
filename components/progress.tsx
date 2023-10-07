"use client";
import { FC, useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";

interface progressProps {}

const ProgressBar: FC<progressProps> = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(100);
  }, [value]);
  return (
    <Card className="mx-auto md:mt-[400px] mt-[300px] md:w-[500px] w-full  shadow-md rounded-md">
      <CardContent className="flex flex-col gap-3">
        <Progress value={value}></Progress>
        <span className="text-lg text-center ">Loading...{value}%</span>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;
