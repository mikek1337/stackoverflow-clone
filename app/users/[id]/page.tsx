import { db } from "@/lib/db";
import { Github, Linkedin, LinkedinIcon, Twitter } from "lucide-react";
import Error from "next/error";
import Image from "next/image";


export default async function Page({params}:{params:{ id:string}}){
   const data = await db.user.findUnique(
    {
        where:{
            id: params.id
        },
        select:{
            id:true,
            email:true,
            Answer:true,
            questions:true,
            github:true,
            about:true,
            linkden:true,
            username:true,
            image:true,
            twitter:true,
            location:true,
        }
    }
    );
/*     if(!data)
    {
        throw new Error({statusCode: 500, title:"This is awkward"})
    } */
   return (
    <div className="flex gap-4 my-4">
        <div className="rounded-md aspect-square border w-fit h-fit">   
            <Image src={data?.image || ""} alt="Profile Pic" width={500} height={700} className="rounded-md w-[500px] h-[400px] object-cover"/>
            <div className="flex flex-col">
                <span>Email: {data?.email}</span>
                <span>Address: {data?.location}</span>
            </div>
        </div>
        <div>
            <div>
                <span className="font-semibold text-3xl">{data?.username}</span>
            </div>
            <hr className="my-4"/>
            <div className="max-w-[600px] my-5">
                <p className="break-words whitespace-break-spaces w-[600px]">{data?.about}</p>
            </div>
            <div className="text-center">
                <h1 className="font-semibold text-2xl">Socials Contact</h1>
            </div>
            <div className="grid grid-cols-3 items-center gap-2 my-10 justify-evenly">
                {
                    data?.github !== null && (
                        <div className="flex items-center shadow-md hover:shadow-lg gap-2 border rounded-full w-fit px-5">
                            <Github className="w-10 h-10 fill-black"/>
                            <a href={data?.github || ""} target="_blank">Github</a>
                        </div>
                    )
                }
                {
                    data?.twitter !== '' &&(
                        <div className="flex items-center shadow-md gap-2 border rounded-full w-fit px-5">
                            <Twitter className="w-10 h-10 fill-blue-500 text-blue-500"/>
                            <a href={data?.twitter || ""} target="_blank">X</a>
                        </div>
                    )
                }
                {
                    data?.linkden !== '' && (
                        <div className="flex items-center shadow-md  gap-2 border rounded-full w-fit p-1 px-5">
                            <LinkedinIcon className="w-10 h-10 "/>
                            <a href={data?.github || ""} target="_blank">Linkdin</a>
                        </div>
                    )
                }
            </div>
            <div>
                <div className="text-center">
                    <h1 className="font-semibold text-2xl">Stats</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="rounded shadow-md p-4 flex flex-col gap-2">
                        <span className="font-bold text-xl">Asked</span>
                        <span className="text-4xl font-bold text-center">{data?.questions.length}</span>
                    </div>
                    <div className="rounded shadow-md p-4 flex flex-col">
                        <span className="font-semibold text-xl">Answered</span>
                        <span className="text-4xl font-bold text-center">{data?.Answer.length}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
   )
}