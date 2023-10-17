/**
 * This component is responsible for rendering the edit profile page.
 * It allows the user to edit their profile information, including their display name, location, private information, social media links, and bio.
 * The component uses TanStack's react-query library to fetch the user's data from the server and update it when the user submits the form.
 * It also uses UploadThing's generateComponents function to create an image uploader component that allows the user to upload a new profile picture.
 * @returns A React component that renders the edit profile page.
 */
"use client";
import ProfileForm from "@/components/setting/profileform";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { UserPostValidator } from "@/lib/validators/post";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateComponents } from "@uploadthing/react";
import { UploadFileResponse } from "uploadthing/client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutoSize from "react-textarea-autosize";
import Image from "next/image";

type FormData = z.infer<typeof UserPostValidator>;
const Page = () => {
  const { UploadButton, UploadDropzone, Uploader } =
    generateComponents<OurFileRouter>();
  const [filePath, setFilePath] = useState<string>("");
  const [userData, setUserData] = useState<FormData>({} as FormData);
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data as User;
    },
    queryKey: ["user"],
  });

  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(UserPostValidator),
    defaultValues: {
      username: "",
      name: "",
      imagePath: filePath,
      github: "",
      linkden: "",
      twitter: "",
      location: "",
      about: "",
    },
  });
  const changeImage = (res: UploadFileResponse[] | undefined) => {
    if (res instanceof Array) {
      setFilePath(res[0].url);
    } else {
      toast({
        title: "Something went wrong",
        description: "Image was not uploaded. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const { mutate: updateUser } = useMutation({
    mutationFn: async ({
      username,
      name,
      imagePath,
      location,
      github,
      linkden,
      twitter,
      about,
    }: UserPostValidator) => {
      const payload: UserPostValidator = {
        username,
        name,
        imagePath,
        location,
        github,
        linkden,
        twitter,
        about,
      };
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

  let submit = async (data: FormData) => {
    const username = data.username;
    const name = data.name;
    const imagePath = filePath;
    const location = data.location;
    const linkden = data.linkden;
    const twitter = data.twitter;
    const github = data.github;
    const about = data.about;
    const payload: UserPostValidator = {
      username,
      name,
      imagePath,
      location,
      github,
      linkden,
      twitter,
      about,
    };
    updateUser(payload);
  };
  useEffect(() => {
    setValue("username", data?.username);
    setValue("name", data?.name);
    setValue("imagePath", data?.image);
    setValue("location", data?.location);
    setValue("github", data?.github);
    setValue("linkden", data?.linkden);
    setValue("twitter", data?.twitter);
    setValue("about", data?.about);
    setFilePath(data?.image);
  }, [data, register]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-fit">
      <div className="relative w-32 h-fit object-cover aspect-square flex flex-col">
        <Image
          src={filePath || ""}
          width="70"
          height="70"
          alt="error loading image"
        />
        <div className="absolute inset-y-24 w-full h-fit">
          <UploadButton
            className={cn(
              buttonVariants({ variant: "default" }),
              "  z-10 backdrop-filter backdrop-blur-sm bg-zinc-700 bg-opacity-50 hover:bg-opacity-60"
            )}
            endpoint="imageUploader"
            onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
              changeImage(res);
            }}
            content={{ allowedContent: "image" }}
            appearance={{
              button: {
                height: "30px",
              },
              allowedContent: {
                display: "none",
              },
            }}
          />
        </div>
      </div>
      <div className="mt-10">
        <form onSubmit={handleSubmit(submit)} id="submit-profile">
          <div className="hidden">
            <input type="text" {...register("imagePath")} />
          </div>
          <div className="md:w-[400px] w-[300px]">
            <label htmlFor="username">Display name</label>
            <Input
              type="text"
              id="username"
              className="border-zinc-600 focus:outline-none"
              {...register("username")}
            />
          </div>
          <div className="md:w-[400px] w-[300px] mt-3">
            <label htmlFor="location">Location</label>
            <Input
              type="text"
              id="location"
              className="border-zinc-600"
              {...register("location")}
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
                {...register("name")}
              />
            </div>
          </div>

          <div className="mt-5 p-3 border-2 border-zinc-200">
            <h3 className="text-zinc-700 text-xl">Socals</h3>
            <div className="grid grid-flow-dense w-full gap-5">
              <div className="md:w-[400px] w-[300px]">
                <label htmlFor="github">Github</label>
                <Input
                  type="text"
                  id="github"
                  className="border-zinc-600"
                  {...register("github")}
                />
              </div>
              <div className="md:w-[400px] w-[300px]">
                <label htmlFor="linkden">Linkden</label>
                <Input
                  type="text"
                  id="linkden"
                  className="border-zinc-600"
                  {...register("linkden")}
                />
              </div>
              <div className="md:w-[400px] w-[300px]">
                <label htmlFor="twitter">Twitter</label>
                <Input
                  type="text"
                  id="twitter"
                  className="border-zinc-600"
                  {...register("twitter")}
                />
              </div>
            </div>
          </div>
          <div className="w-full  mt-3">
            <label>About</label>
            <TextareaAutoSize
              placeholder="Bio..."
              className="border-b-2  text-xl focus:outline-none p-4"
              rows={100}
              {...register("about")}
            />
          </div>
        </form>
        <Button form="submit-profile" type="submit" className="my-5 w-fit">
          Update
        </Button>
      </div>
    </div>
  );
};

export default Page;
