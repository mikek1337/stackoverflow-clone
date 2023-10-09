import { db } from "@/lib/db";
import { Question } from "@prisma/client";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get('q');
    if (q === null) return new Response('q missing', { status: 400 });

    let data: Question[] = [];
    if (q === "new") {
        const date = new Date();
        const yesterday = new Date(date.getDate() - 1)
        data = await db.question.findMany({
            where: {
                AND: [
                    {
                        postedDate: {
                            lte: date,
                        }
                    },
                    {
                        postedDate: {
                            gt: yesterday
                        }
                    }
                ]
            }
        });
    }
    else if (q === "week") {
        const date = new Date();
        const weekDate = new Date(date.setDate(date.getDate() - 7));
        console.log(weekDate);
        data = await db.question.findMany({
            where: {
                AND: [
                    {
                        postedDate: {
                            lte: date,
                        }
                    },
                    {
                        postedDate: {
                            gt: weekDate,
                        }
                    }

                ]

            }
        })
    }
    else {
        const date = new Date();
        const monthDate = new Date(date.setMonth(date.getMonth() - 1));
        data = await db.question.findMany({
            where: {
                AND: [
                    {
                        postedDate: {
                            lte: date
                        }
                    },
                    {
                        postedDate: {
                            gt: monthDate
                        }
                    }
                ]
            }
        })
    }

    return new Response(JSON.stringify(data));
}