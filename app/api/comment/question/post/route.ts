import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CommentPostValidator } from "@/lib/validators/post";
import { z } from "zod";
export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (session?.user) {
            const data = await req.json();
            const { comment, questionId, userId } = CommentPostValidator.parse(data);

            await db.questionComment.create({
                data: {
                    comment: comment,
                    questionId: questionId,
                    userId: userId,
                },
            });
            return new Response("OK");
        }
        return new Response("Unauthorized", { status: 401 });
    } catch (err) {
        if (err instanceof z.ZodError)
            return new Response(err.message, { status: 400 });
        return new Response("Something went wrong, Please try again later!", {
            status: 500,
        });
    }
}
