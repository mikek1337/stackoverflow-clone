import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { AvatarProps } from "@radix-ui/react-avatar";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}
export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarFallback>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2a10 10 0 00-7.64 16.32c.13-.95.3-2.14.53-3.4a4.5 4.5 0 019-1.5c0 .4-.03.8-.1
                        1.18A9.96 9.96 0 0012 2zm0 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </AvatarFallback>
      <Image src={user.image || "" } alt={user.name || ""} width="50" height="50"/>
    </Avatar>
  );
}
