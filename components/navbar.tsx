import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { UserAccountNav } from "./usernavmenu";
import { getAuthSession } from "@/lib/auth";

const NavBar = async () => {
  const  data =  await getAuthSession();
  return (
    <div className="pt-2 border-b-2 w-full">
      <ul className="flex justify-center items-center gap-4">
        <li className="w-fit ">
          <div className="w-40 h-fit">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width="10" height="20" />
            </Link>
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
        {!data && 
          <li className="flex gap-1 justify-end w-fit">
            <Link
              href="/login"
              className={buttonVariants({ variant: "default" })}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ variant: "ghost" })}
            >
              SignUp
            </Link>
          </li>
        }
        {data && (
          <div className="w-fit">
            <UserAccountNav user={data.user} className="float-right w-fit"/>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
