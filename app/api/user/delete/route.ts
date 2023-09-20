import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function DELETE(req: Request) {
    const session = await getAuthSession();
    if (session?.user) {
        await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                username: "anon",
                email: "anon@somemail.com"
            }
        });
        return new Response("OK");
    }
    return new Response("Unauthorized", { status: 401 });
}