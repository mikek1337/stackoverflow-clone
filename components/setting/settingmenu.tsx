import Link from "next/link";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icons } from "../icons";

const SettingMenu: FC = () => {
  return (
    <div className="flex flex-col gap-3 max-w-max mx-10">
      {/*       <div className=" w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full text-center">
            <Icons.menuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Personal information</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/setting" className="active:bg-orange-400 active">
                Edit Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/setting/delete">Delete Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/setting/question">Your questions</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <div className="">
        <h6 className="text-sm font-semibold text-zinc-800 my-3">
          Personal information
        </h6>
        <ul>
          <li className="p-2">
            <Link href="/setting/edit" className="active:bg-orange-400 active">
              Edit Profile
            </Link>
          </li>
          <li className="p-2">
            <Link href="/setting/delete">Delete Profile</Link>
          </li>
          <li className="p-2">
            <Link href="/setting/question">Your questions</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingMenu;
