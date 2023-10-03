"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserPostValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateComponents } from "@uploadthing/react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadFileResponse } from "uploadthing/client";
import { OurFileRouter } from "../api/uploadthing/core";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type FormData = z.infer<typeof UserPostValidator>;

const Page = () => {
  const { UploadButton, UploadDropzone, Uploader } =
    generateComponents<OurFileRouter>();
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(UserPostValidator),
    defaultValues: {
      username: "mikias",
      name: "mikias",
      imagePath: "",
    },
  });
  const changeImage = (res: UploadFileResponse[] | undefined) => {
    if (res instanceof Array) {
      setFilePath(res[0].url);
    }
  };

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

  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      setFilePath(data.image);
      return data as User;
    },
    queryKey: ["user"],
  });
  const [filePath, setFilePath] = useState<string>("");

  /*   const session = await getAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  }); */
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
  return (
    <div>
      <div className="w-32 h-32 object-contain flex flex-col mb-28">
        <Image src={filePath || ""} width="70" height="70" alt="" />
        <div className=" w-full h-fit">
          <UploadButton
            className={cn(
              buttonVariants({ variant: "default" }),
              "absolute w-fit h-fit z-10"
            )}
            endpoint="imageUploader"
            onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
              changeImage(res);
            }}
          />
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="hidden">
            <input type="text" {...register("imagePath")} />
          </div>
          <div className="md:w-[400px] w-[300px]">
            <label htmlFor="username">Display name</label>
            <Input
              type="text"
              id="username"
              className="border-zinc-600 focus:outline-none"
              defaultValue={data?.username || ""}
              {...register("username")}
            />
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
                defaultValue={data?.name || ""}
                {...register("name")}
              />
            </div>
          </div>
          <div>
            <h3>Address</h3>
            <div className="grid grid-cols-3 w-full">
              <div className="md:w-[400px] w-[300px]">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  id="address"
                  className="border-zinc-600"
                  defaultValue={data?.address || ""}
                  {...register("address")}
                />
              </div>
              <div className="md:w-[400px] w-[300px]">
                <label htmlFor="city">City</label>
                <Input
                  type="text"
                  id="city"
                  className="border-zinc-600"
                  defaultValue={data?.city || ""}
                  {...register("city")}
                />
            </div>
            <div className="md:w-[400px] w-[300px]">
              <label htmlFor="state">State</label>
              <Input
                type="text"
                id="state"
                className="border-zinc-600"
                defaultValue={data?.state || ""}
                {...register("state")}
              />
              </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
