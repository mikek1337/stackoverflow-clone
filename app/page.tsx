import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getAuthSession();
  session?.user ? redirect("/questions") : null;
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
        <Link
          href="\questions"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-[500px] mx-auto"
          )}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
