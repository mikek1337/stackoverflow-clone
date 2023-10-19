import { FC } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
interface ProfileHeaderProps {
  user: User | null;
}
const ProfileHeader: FC<ProfileHeaderProps> = async ({
  user,
}: ProfileHeaderProps) => {
  return (
    <div className="flex items-center p-10 gap-3">
      <div className=" w-[100px] h-[100px]">
        <Image
          src={user?.image || ""}
          alt="user image"
          className="rounded-md "
          width={100}
          height={100}
        />
      </div>
      <div>
        <h1 className="font-semibold text-xl">{user?.username}</h1>
      </div>
    </div>
  );
};
export default ProfileHeader;
