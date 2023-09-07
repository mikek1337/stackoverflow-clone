import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center top-72 relative space-y-6 sm:w-[800px] ">
      <div className="flex flex-col space-y-2 text-center gap-2">
        <h1 className="sm:text-5xl text-2xl font-bold text-center">
          Welcome to Stackoverflow clone
        </h1>
        <p className="sm:text-3xl text-xl w-auto">
          Every developer data scientist system admin mobile developer game
          developer has a tab open to Stack Overflow
        </p>
        <Button className={cn("w-[500px] mx-auto ")}>Get Started</Button>
      </div>
    </div>
  );
}
