"use client"
import {useState, useEffect} from 'react';
import EditorOutput from "@/components/editoroutput";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/useravatar";
import { cn, formatTimeToNow } from "@/lib/utils";
import PostAnswer from "@/components/postanswer";
import PostVote from "@/components/postvote";
import AddQuestion from "@/components/addquestion";
import Comment from "@/components/comment";
import { Recommendation } from "@/components/recommendation";
import { AskAi } from "@/components/ai/askAi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { QuestionWithCommentsAndVotes } from '@/types/questions';
import { Skeleton } from '@/components/ui/skeleton';


export default function Page({ params }: { params: { slug: string } }) {
  
   const session = useSession();
  const {data, isLoading} = useQuery({
    queryKey:["question"],
    queryFn: async ()=>{
      const res = await axios.get("/api/question?q="+params.slug);
      return res.data as QuestionWithCommentsAndVotes
    }
  });

    if(isLoading)
      return(
      <Skeleton className='w-full h-[500px] animate-pulse '/>
      )
  return (
    <div>
     
    
      <div className="flex flex-row ">
        <div className="md:container ">
          <div className="w-full">
            <div className="flex flex-col">
              <div className="flex md:flex-row flex-col md:items-center md:justify-between mt-2 ">
                <div className="">
                  <p className="md:text-3xl text-xl text-zinc-500">
                    {data?.title}
                  </p>
                </div>
                <div className="md:self-start md:w-auto w-fit">
                  <AddQuestion />
                </div>
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
            <div className="my-3 flex">
              <div className="w-fit h-full">
                <div>
                  {
                    data && 
                  <PostVote
                    postId={params.slug}
                    postedContent="question"
                    initialVote={data?.votes?.find((vote)=>vote.userId===session?.data?.user.id)?.type} 
                  />
                  }
                </div>
              </div>
              <div className="md:w-full w-[300px]">
                <EditorOutput content={data?.problemDetail} />
                <EditorOutput content={data?.triedMethods} />
                <div className="flex my-6 gap-2">
                  {data?.tags?.split(",").map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-blue-100 w-fit text-xs px-2 py-0 font-normal text-blue-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
           
            <div className="md:w-full w-[300px]"></div>
            <div className="rounded-md bg-blue-100 w-fit float-right pr-5 pl-1">
              <span className="text-zinc-400 text-xs py-1">
                {" "}
                Asked{" "}
                {data?.postedDate && new Date(data.postedDate).toDateString()}
              </span>
              <div className="flex items-center gap-2 my-1">
                {data && <UserAvatar
                  user={data?.user ?? { name: null, image: null }}
                  className="rounded-md w-[40px] h-[40px]"
                />}
                
                <span className="text-xs">{data?.user?.username}</span>
              </div>
            </div>
          </div>
          <div className="my-10">
            {data && <Comment
              contentId={params.slug}
              type="question"
             
            />}
            
          </div>
         <AskAi questionId={params.slug}/>
          <div>
            <div className="my-3 flex justify-between">
              <h2 className="text-zinc-600 text-xl">
               
              </h2>
            </div>
            <div>
              {data &&  <PostAnswer
                questionId={params.slug}
                isOwner={data?.user?.id === session?.data?.user.id}
              />}
              
            </div>
          </div>
        </div>
        {
        data !== undefined && 
        <Recommendation id={params.slug}/>
        }
      </div>
    
          
    </div>
  );
}
