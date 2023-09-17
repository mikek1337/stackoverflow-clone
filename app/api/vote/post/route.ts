import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { VotePostValidator } from "@/lib/validators/post";

export async function POST(req: Request) {
    const session = await getAuthSession();
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    if (session?.user) {
        const data = await req.json();
        const votePost = VotePostValidator.parse(data);
        console.log(votePost)
        if (q == "question") {
            await db.vote.create({
                data: {
                    type: votePost.voteType,
                    postId: votePost.questionId,
                    userId: session.user.id,
                },
            })

        }
        else if (q == "answer") {
            await db.answerVote.create({
                data: {
                    type: votePost.voteType,
                    postId: votePost.questionId,
                    userId: session.user.id,
                },
            });
            /*  await db.answerVote.create({
                 data: {
                     type: votePost.voteType,
                     postId: votePost.questionId,
                     userId: session.user.id,
                 }
             }) */
        }
        return new Response("OK");
    }
    else {
        return new Response("Unauthorized", { status: 401 });
    }

}