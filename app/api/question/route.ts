import { db } from "@/lib/db";

export async function GET(req: Request) {
    const result = await db.question.findMany({
        include: {
            user: true,
        },
        take: 10,
    });

    return new Response(JSON.stringify(result));

}