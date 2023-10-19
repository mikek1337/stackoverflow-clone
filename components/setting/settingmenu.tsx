"use client";
import Link from "next/link";
import { FC, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SettingMenu: FC = () => {
  const path = usePathname();

  return (
    <aside className="flex-1 flex-col gap-3 max-w-max  md:mx-10 h-full px-2">
      <div className="">
        <h6 className="text-sm md:text-left text-center font-semibold text-zinc-800 my-3">
          Personal information
        </h6>
        <ul className="flex md:block text-sm w-full">
          <li className="p-2 w-auto">
            <Link
              href="/setting/edit"
              className={cn(
                "hover:cursor-pointer hover:shadow-md rounded-md px-3",
                {
                  "shadow-md bg-zinc-300": path.search("edit") > 0,
                }
              )}
            >
              Edit Profile
            </Link>
          </li>
          <li className="p-2 w-auto">
            <Link href="/setting/delete">Delete Profile</Link>
          </li>
          <li className="p-2 w-auto">
            <Link href="/setting/question">Your questions</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SettingMenu;
