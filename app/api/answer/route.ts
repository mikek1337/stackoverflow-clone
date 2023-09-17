import { db } from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    let result;
    if (q) {

        result = await db.answer.findMany({
            where: {
                questionId: q
            },
            include: {
                user: true,
                votes: true,
            }
        })
        return new Response(JSON.stringify(result));
    }
    return new Response("Error something went wrong", { status: 400 })
}