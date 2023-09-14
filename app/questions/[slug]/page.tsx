"use client";
import { FC } from "react";

import SideMenu from "@/components/sidemenu";
import { useQuery } from "@tanstack/react-query";
import { QuestionDetail } from "@/types/db";
import axios from "axios";
import EditorOutput from "@/components/editoroutput";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/useravatar";

export default function Page({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/question?q=${params.slug}`);

      return data as QuestionDetail;
    },
  });
  console.log(data);
  const postedDate = data?.postedDate.toString();
  return (
    <div className="flex flex-row">
      <SideMenu />
      <div className="container">
        <div className="">
          <div className="flex flex-col">
            <div className="w-full">
            <h4 className="text-3xl text-zinc-500">{data?.title}</h4>
            </div>
            <div className="flex gap-2">
              <span className="w-fit">Asked {postedDate}</span>
              <span className="w-fit">Modified today</span>
              <span className="w-fit">viewed 2 times</span>
            </div>
          </div>
          <hr />
          <div className="my-3">
            <div>
              <div>
                
              </div>
            </div>
            <EditorOutput content={data?.problemDetail} />
          </div>
          <div>
            <EditorOutput content={data?.triedMethods} />
          </div>
          <div className="flex">
            <Badge
              variant="outline"
              className="bg-blue-100 w-fit text-xs px-2 py-0 font-thin text-blue-600"
            >
              {data?.tags}
            </Badge>
          </div>
          <div className="rounded-md bg-blue-300 w-fit float-right">
            <span className="text-zinc-300">Asked 31 secs ago</span>
           
          </div>
        </div>
      </div>
    </div>
  );
}
