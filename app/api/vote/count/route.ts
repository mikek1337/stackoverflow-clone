import { db } from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    const postId = url.searchParams.get("postId")
    console.log(postId);
    if (q == "question") {
        const downCount = await db.vote.count({ where: { AND: [{ postId: postId || "" }, { type: "DOWN" }] } });
        const upCount = await db.vote.count({ where: { AND: [{ postId: postId || "" }, { type: "DOWN" }] } });
        const diff = downCount - upCount
        return new Response(JSON.stringify({ "vote": diff }))
    }
    else {
        const downCount = await db.answerVote.count({ where: { AND: [{ postId: postId || "" }, { type: "DOWN" }] } });
        const upCount = await db.answerVote.count({ where: { AND: [{ postId: postId || "" }, { type: "DOWN" }] } });
        const diff = downCount - upCount
        return new Response(JSON.stringify({ "vote": diff }))
    }
}