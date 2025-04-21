import { db } from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    const skip = url.searchParams.get("skip");
    let result;
    if (!q) {
        result = await db.question.findMany({
            include: {
                user: true,
                votes: true,
                answers: true
            },
            skip: skip ? parseInt(skip) : 0,
            take: 10,
        });
    }
    else {
        result = await db.question.findFirst({
            where: {
                id: q
            },
            include: {
                user: true,
                votes: true,
                answers: {
                    include: {
                        user: true,
                        votes: true,
                    }
                }
            }
        });
        

    }

    return new Response(JSON.stringify(result));

}
