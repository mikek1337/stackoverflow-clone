"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC } from "react";
import type { Question } from "@prisma/client";
import Loading from "@/app/loading";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Loader } from "lucide-react";
type RecommendationProps = {
    id:string
}
export const Recommendation:FC<RecommendationProps> = ({id})=>{
    const{data, isLoading} = useQuery({
        queryKey:["similar", id],
        queryFn: async()=>{
            try{
                const res = await axios.get<Question[]>(`/api/question/similar?postId=${id}`);
                return res.data;
            }catch(err){
                if(err instanceof AxiosError)
                {
                    if(err.status === 400)
                        console.error('bad request');
                }
            }
        }
    })
    return(
        <article className="h-fit my-10 max-w-[300px] md:block hidden rounded-md border  shadow-md p-1">
            <span className="text-xl  ">Similar questions</span>
            <hr className="my-2 border-zinc-300"/>
            {
                isLoading && <Loader className="w-5 h-5 animate-spin mx-auto"/>
            }
            <div className="flex flex-col gap-3">
                {
                    data?.map((question)=>(
                        <div className="rounded-md flex flex-col gap-3 p-3 bg-zinc-100 " key={question.id}>
                            <Link href={`/questions/${question.id}`} className="text-zinc-500 hover:underline">{question.title}</Link>
                                <div className="flex flex-wrap justify-start items-center gap-2">
                            {
                                question.tags.split(',').map((tag)=>(
                                    <Badge className="w-fit" key={tag}>{tag}</Badge>
                                ))
                            }
                                </div>
                        </div>
                    ))
                }
            </div>
        </article>
    )
}