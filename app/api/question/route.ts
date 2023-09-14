import { db } from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    let result;
    if (!q) {
        result = await db.question.findMany({
            include: {
                user: true,
            },
            take: 10,
        });
    }
    else {
        result = await db.question.findFirst({
            where: {
                id: q
            },
        })
    }

    return new Response(JSON.stringify(result));

}