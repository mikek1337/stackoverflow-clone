"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";


const SideMenu: FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName.search("tags"))
  return (
    <div className="w-[153px] h-[100vh] border-r-2 text-zinc-500 ">
      <div className="active:bg-slate-200 py-2 mt-4">
        <Link href="/">Home</Link>
      </div>
      <div>
        <div className="mt-1">
          <h6 className="">Public</h6>
        </div>
        <div className="ml-4 flex flex-col gap-2 py-3">
          <Link href="/questions" className={cn("active:bg-zinc-200", {"text-zinc-900":pathName.search("questions")>0})}>
            Questions
          </Link>
          <Link href="/tags" className={cn("active:bg-zinc-200", {"text-zinc-900":pathName.search("tags")>0})}>Tags</Link>
          <Link href="/users" className={cn("active:bg-zinc-200", {"text-zinc-900":pathName.search("users")>0})}>Users</Link>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
