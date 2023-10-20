import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { UserAccountNav } from "./usernavmenu";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import SearchBar from "./searchquestionbar";

const NavBar = async () => {
  const data = await getAuthSession();
  return (
    <div className="pt-2 border-b-2 w-full ">
      <ul className="flex md:justify-center justify-evenly items-center gap-4 relative">
        <li className="md:hidden block w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Icons.menuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="mt-1">
                  <h6 className="">Public</h6>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/questions" className={cn("active:bg-zinc-200")}>
                  Questions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/tags" className={cn("active:bg-zinc-200")}>
                  Tags
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/users" className={cn("active:bg-zinc-200")}>
                  Users
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li className="w-fit md:block flex items-center">
          <div className="w-40 h-fit ">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width="10" height="20" />
            </Link>
          </div>
        </li>
        <li className=" md:w-full w-20 md:block hidden">
          <SearchBar />
        </li>
        <li className="md:hidden block w-fit ">
          <Icons.search className="text-zinc-700 w-auto focus:hidden" />
        </li>
        {!data && (
          <li className="flex gap-1 justify-end w-fit ">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "md:block hidden"
              )}
            >
              <span className="md:block hidden">Login</span>
              <Icons.login className="md:hidden block w-5 h-5" />
            </Link>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "default" }),
                "text-sm w-fit font-bold"
              )}
            >
              SignUp
            </Link>
          </li>
        )}
        <li className="w-fit md:block flex items-center">
          {data && (
            <div className="">
              <UserAccountNav user={data.user} className="w-fit" />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
