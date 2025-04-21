import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { VoteType } from "@prisma/client";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    const postId = url.searchParams.get("postId");
    let downCount, upCount, diff = 0;
    let userVote;
    const session = await getAuthSession();
    if(!postId)
        return new Response("Bad Request", {status: 400});
    console.log(postId);
    if (q == "question") {
        downCount = await db.vote.count({ where: { AND: [{ postId: postId }, { type: "DOWN" }] } });
        upCount = await db.vote.count({ where: { AND: [{ postId: postId }, { type: "UP" }] } });
        if(session?.user){
            userVote = await db.vote.findFirst({ where: { AND: [{postId: postId}, {userId: session.user.id}]}, select:{type:true}});
        }
        console.log('downvotedcount', downCount)
        console.log('upvotedcountquestion', upCount)
        
    }
    else {
        downCount = await db.answerVote.count({ where: { AND: [{ postId: postId || "" }, { type: "DOWN" }] } });
        upCount = await db.answerVote.count({ where: { AND: [{ postId: postId || "" }, { type: "UP" }] } });
        if(session?.user){
            userVote = await db.answerVote.findFirst({ where: { AND: [{postId: postId}, {userId: session.user.id}]}, select:{type:true}});
        }
        console.log('downvotedcount', downCount)
        console.log('upvotedcount', upCount)
    }
    diff = upCount - downCount;
    return new Response(JSON.stringify({ "vote": diff,  userVote}))
        
}