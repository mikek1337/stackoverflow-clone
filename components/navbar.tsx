"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
const NavBar = () => {
  return (
    <div className="pt-2">
      <ul className="flex justify-center items-center gap-4">
        <li className="w-fit ">
          <div className="w-40 h-fit">
            <Image src="/logo.svg" alt="logo" width="10" height="20" />
          </div>
        </li>
        <li className="w-fit">
          <div>
            <Link href="#">About</Link>
          </div>
        </li>
        <li className=" md:w-full w-20">
          <Input type="search" placeholder="Search..." />
        </li>
        <li className="flex gap-1 justify-end w-fit">
            <Link href="/login" className={buttonVariants({variant:'default'})}>Login</Link>
            <Link href="/signup" className={buttonVariants({variant:'ghost'})}>SignUp</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
