import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";

const AddQuestion: FC = () => {
  return (
    <Link
      className={cn(buttonVariants({ variant: "default" }), "w-[200px]")}
      href="/questions/ask"
    >
      Ask Question
    </Link>
  );
};

export default AddQuestion;
