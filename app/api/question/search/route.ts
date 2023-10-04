import { db } from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const searchParam = url.searchParams.get('q')?.toLowerCase();
    if (!searchParam) return new Response("invalid parameter", { status: 400 })

    const result = await db.question.findMany({
        where: {
            OR: [
                {
                    title: {
                        startsWith: searchParam,
                        mode: 'insensitive'
                    }
                },
                {
                    tags: {
                        startsWith: searchParam
                    }
                }
            ]
        },
        include: {
            _count: true
        }
    });

    return new Response(JSON.stringify(result));
}