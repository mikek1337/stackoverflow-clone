import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AnswerPostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
    const session = await getAuthSession();
    try {

        if (session?.user) {
            const data = await req.json();
            const { content, questionId, isAi } = AnswerPostValidator.parse(data);
            await db.answer.create({
                data: {
                    content: content,
                    questionId: questionId,
                    userId: session.user.id,
                    isAi: isAi
                }
            });
            return new Response("OK");
        }
        return new Response("Unauthorized", { status: 401 });

    } catch (error) {
        if (error instanceof z.ZodError)
            return new Response(error.message, { status: 400 });

        return new Response(error, { status: 500 });
    }
}