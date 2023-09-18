"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ProfileFormProps {
  user: User | null;
}
const ProfileForm: FC<ProfileFormProps> = ({ user }: ProfileFormProps) => {
  return (
    <div>
      <div>
        <div>
          <form id="user-profile" className="my-3">
            <div className="border-2 rounded-md p-3 ">
              <div className="p-3 mt-3">
                <span>Profile image</span>
                <div className=" w-[140px] h-[140px]">
                  <Image
                    src={user?.image}
                    alt="user pic"
                    width="140"
                    height="140"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="relative  py-2 z-10 -top-8  text-xs bg-zinc-400 bg-transparent h-fit text-white"
                  >
                    Change image
                  </button>
                  <Input
                    type="text"
                    className="hidden"
                    id="image"
                    defaultValue={user?.image}
                  />
                  <Input type="file" className="hidden" id="image" />
                </div>
              </div>
              <div className="w-[400px]">
                <label htmlFor="username">Display name</label>
                <Input
                  type="text"
                  id="username"
                  className="border-zinc-600 focus:outline-none"
                  defaultValue={user?.username}
                />
              </div>
            </div>
            <div className="mt-3 p-3 border-2">
              <div className="flex mt-3">
                <h3 className=" text-xl">Private information</h3>
                <span className="text-sm  text-zinc-400">
                  Not shown publicly
                </span>
              </div>
              <div className="w-[400px]">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  id="name"
                  className="border-zinc-600"
                  defaultValue={user?.name}
                />
              </div>
            </div>
          </form>
          <Button className="w-fit">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
