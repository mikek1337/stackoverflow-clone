import { getAuthSession } from "@/lib/auth";
import { PostValidator } from '@/lib/validators/post';
import { db } from "@/lib/db";
import { z } from 'zod';
import { AxiosError } from "axios";
export async function POST(req: Request) {
    const session = await getAuthSession();
    try {
        const body = await req.json();
        const { title, problemDetail, triedMethods, tags } = PostValidator.parse(body);
        if (session?.user) {

            db.question.create({
                data: {
                    title: title,
                    problemDetail: problemDetail,
                    triedMethods: triedMethods,
                    tags: tags,
                    postedBy: session.user.id,
                    postedDate: new Date(),
                }
            });

            return new Response("OK");
        }

        return new Response("Unauthorized", { status: 401 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error.message)
            return new Response(error.message, { status: 400 });
        }


        return new Response("Could not post question. Please try again later", {
            status: 500
        });
    }
}