"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { FC, MouseEvent, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPostValidator } from "@/lib/validators/post";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { UploadFileResponse } from "uploadthing/client";
interface ProfileFormProps {
  user: User | null;
}
type FormData = z.infer<typeof UserPostValidator>;
const ProfileForm: FC<ProfileFormProps> = ({ user }: ProfileFormProps) => {
  const [filePath, setFilePath] = useState<string>(user?.image || "");
  const { UploadButton, UploadDropzone, Uploader } =
    generateComponents<OurFileRouter>();

  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(UserPostValidator),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      imagePath: user?.image || "",
    },
  });
  const { mutate: updateUser } = useMutation({
    mutationFn: async ({ username, name, imagePath }: UserPostValidator) => {
      const payload: UserPostValidator = { username, name, imagePath };

      const { data } = await axios.patch("/api/user/edit", payload);
      return data;
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Your profile was not updated. Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        description: "Profile updated",
      });
    },
  });

  const submit = async (data: FormData) => {
    const username = data.username;
    const name = data.name;
    const imagePath = filePath;
    const payload: UserPostValidator = {
      username,
      name,
      imagePath,
    };
    updateUser(payload);
  };
  const changeImage = (res: UploadFileResponse[] | undefined) => {
    if (res instanceof Array) {
      setFilePath(res[0].url);
    }
  };
  return (
    <div>
      <div>
        <form
          id="user-profile"
          className="my-3"
          onSubmit={handleSubmit(submit)}
        >
          <div className="border-2 rounded-md p-3 ">
            <div className="p-3 my-6 overflow-clip h-">
              <span>Profile image</span>
              <div className=" md:w-[200px] md:h-[200px] w-[150px] h-[150px] ">
                <Image
                  src={filePath || ""}
                  alt="user pic"
                  width={100}
                  height={100}
                />
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    changeImage(res);
                  }}
                  className="relative w-full  z-1 -top-8  text-xs bg-zinc-400 bg-transparent h-fit text-white"
                />
              </div>
              <Input
                type="text"
                className="hidden"
                id="image"
                {...register("imagePath")}
                value={filePath}
              />
            </div>
            <div className="md:w-[400px] w-[300px]">
              <label htmlFor="username">Display name</label>
              <Input
                type="text"
                id="username"
                className="border-zinc-600 focus:outline-none"
                defaultValue={user?.username || ""}
                {...register("username")}
              />
            </div>
          </div>
          <div className="mt-3 p-3 border-2">
            <div className="flex mt-3">
              <h3 className=" text-xl">Private information</h3>
              <span className="text-sm  text-zinc-400">Not shown publicly</span>
            </div>
            <div className="md:w-[400px] w-[300px]">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                className="border-zinc-600"
                defaultValue={user?.name || ""}
                {...register("name")}
              />
            </div>
          </div>
        </form>
        <Button className="w-fit" form="user-profile">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
