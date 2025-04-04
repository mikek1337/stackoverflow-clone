"use client"

import Image from "next/image";
import Link from "next/link";

const CustomLinkRenderer = ({data}:any)=>{
console.log(data);
return(
 <div className="flex flex-wrap justify-between max-w-[300px] border-2 my-2">
    <Image src={data.meta.image.url} width={100} height={100} alt=""/>
    <div className="flex flex-col gap-2">
        <span className="text-xl font-bold capitalize">{data.meta.title}</span>
        <p className="text-sm text-zinc-400 text-ellipsis  whitespace-nowrap">{data.meta.description}</p>
        <Link href={data.link} className="text-sm">{data.link}</Link>
    </div>

 </div>   
)
}

export default CustomLinkRenderer;