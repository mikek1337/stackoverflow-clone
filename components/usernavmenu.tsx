"use client";

import Link from "next/link";
import { User } from "next-auth";
import Image from "next/image";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { UserAvatar } from "./useravatar";
interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: any;
}

export function UserAccountNav({ user, ...props }: UserAccountNavProps) {
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white  w-[400px] float-right">
        <div className="flex items-center justify-end gap-2 p-2 w-full">
          <div className="flex flex-col space-y-1 leading-none w-full justify-end">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/setting/question">Your questions</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/questions/ask">Ask question</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/setting">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
