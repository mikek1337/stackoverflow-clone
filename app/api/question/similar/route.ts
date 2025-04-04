import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(req:Request){
    const url = new URL(req.url);
    const q = url.searchParams.get('postId');
    if(!q)
        return new Response("Bad Request", {status: 400});

    const post = await db.question.findUnique({
        where:{
            id: q
        },
        select:{
            tags: true
        }
    });
    
    let query:any = [] as Prisma.QuestionWhereInput
    post?.tags.split(',').map((tag)=>{
        query.push(
            {
                tags:{
                    contains:tag
                }
            }
        )
    })
   
    const similarPosts = await db.question.findMany({
        take:4,
        where:{
            AND:[
                {
                    OR: query,

                },
                {
                    id:{
                        not:q
                    }

                }
            ]
        },
    });
    return new Response(JSON.stringify(similarPosts), {status:200});
}