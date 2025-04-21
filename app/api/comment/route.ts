import { db } from "@/lib/db";

export async function GET(req:Request){
    const url = new URL(req.url);
    const contentId = url.searchParams.get("contentId");
    const contentType = url.searchParams.get("contentType");
    if(!contentId || !contentType)
        return new Response("Bad request", {status: 400});
    if(contentType == "question"){
        const res = await db.questionComment.findMany({
            where:{
                questionId: contentId
            },
            include:{
                user:true
            }
        });
        return new Response(JSON.stringify(res));
    } else{
        const res = await db.answerComment.findMany({
            where:{
                answerId: contentId,
            },
            include:{
                user:true
            }
        })
        return new Response(JSON.stringify(res));
    }
}