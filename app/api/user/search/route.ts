import { db } from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    if (!q)
        return new Response("Missing query", { status: 400 });

    const result = await db.user.findMany({
        where: {
            username: {
                startsWith: q
            }
        },
        select: {
            image: true,
            username: true,
            id: true
        }
    });

    return new Response(JSON.stringify(result));
}