import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CommentPostValidator } from "@/lib/validators/post";
import { z } from "zod";
export async function POST(req: Request) {
    try {

        const session = await getAuthSession();
        if (session?.user) {
            const data = await req.json();
            const payload = await CommentPostValidator.parse(data);
            await db.answerComment.create({
                data: {
                    comment: payload.comment,
                    userId: session.user.id,
                    answerId: payload.questionId
                }
            });

            return new Response("OK");
        }
        return new Response("Unauthorized", { status: 401 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}