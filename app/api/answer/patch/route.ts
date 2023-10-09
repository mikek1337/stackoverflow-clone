import { db } from "@/lib/db";

export async function PATCH(req: Request) {
    const url = new URL(req.url)
    const q = url.searchParams.get('q')
    if (!q) return new Response('q is required', { status: 400 });

    const res = await db.answer.update({
        where: {
            id: q,
        },
        data: {
            isAnswer: true,
        }
    });

    return new Response(JSON.stringify(res));
}