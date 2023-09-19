import { db } from "@/lib/db";
import { UserPostValidator } from "@/lib/validators/post";
import { getAuthSession } from "@/lib/auth";
import { ZodError } from "zod";
export async function PATCH(req: Request) {
    try {
        const session = await getAuthSession();
        if (session?.user) {

            const data = await req.json();
            const payload = UserPostValidator.parse(data);
            await db.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    username: payload.username,
                    image: payload.imagePath,
                    name: payload.name
                }
            });

            return new Response("OK");
        }
        return new Response("Unauthenticated", { status: 401 })
    } catch (err) {
        if (err instanceof ZodError) {
            return new Response(err.message, { status: 400 })
        }

        return new Response("Could not update user profile. Please try again", { status: 500 });

    }

}