"use client";
import SideMenu from "@/components/sidemenu";
import { useQuery } from "@tanstack/react-query";
import { QuestionDetail } from "@/types/db";
import axios from "axios";
import EditorOutput from "@/components/editoroutput";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/useravatar";
import { formatTimeToNow } from "@/lib/utils";
import { Select, SelectGroup, SelectLabel } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Answer from "@/components/answer";
import PostAnswer from "@/components/postanswer";

export default function Page({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/question?q=${params.slug}`);

      return data as QuestionDetail;
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-row">
        <SideMenu />
        <div className="container">
          <div className="">
            <div className="flex flex-col">
              <div className="w-full">
                <h4 className="text-3xl text-zinc-500">{data?.title}</h4>
              </div>
              <div className="flex gap-2 text-sm my-2">
                <span className="w-fit">
                  Asked{" "}
                  {data?.postedDate &&
                    formatTimeToNow(new Date(data.postedDate))}
                </span>

                <span className="w-fit">Modified today</span>
                <span className="w-fit">viewed 2 times</span>
              </div>
            </div>
            <hr />
            <div className="my-3">
              <div>
                <div></div>
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
            <div className="rounded-md bg-blue-100 w-fit float-right pr-5 pl-1">
              <span className="text-zinc-400 text-xs py-1">
                {" "}
                Asked{" "}
                {data?.postedDate && new Date(data.postedDate).toDateString()}
              </span>
              <div className="flex items-center gap-2 my-1">
                <UserAvatar
                  user={data?.user ?? { name: null, image: null }}
                  className="rounded-md w-[40px] h-[40px]"
                />
                <span className="text-xs">{data?.user.username}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="my-3 flex justify-between">
              <h2 className="text-zinc-300">{data?.answers.length} Answers</h2>
              <div className="flex justify-start">
                <div className="w-fit">
                  <span className="text-sm">Sorted by:</span>
                </div>
                <Select>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Highest Votes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort</SelectLabel>
                      <SelectItem value="postedDate">Date Created</SelectItem>
                      <SelectItem value="modifiedDate">
                        Date Modified
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Answer data={data?.answers || []} />
              <PostAnswer />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
