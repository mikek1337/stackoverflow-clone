import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    const session = await getAuthSession();
    if (session?.user) {
        const result = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });
        return new Response(JSON.stringify(result));
    }
    return new Response("Unauthenticated", { status: 401 });

}