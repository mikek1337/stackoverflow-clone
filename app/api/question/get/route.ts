import { db } from "@/lib/db";
import { Question } from "@prisma/client";
import { setDate } from "date-fns";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const q = url.searchParams.get('q');
    if (q === null) return new Response('q missing', { status: 400 });

    let data: Question[] = [];
    if (q === "new") {
        const date = new Date();
        console.log()
        data = await db.question.findMany({
            include: {
                user: true,
                votes: true,
                answers: true
            },
            where: {
                postedDate: {
                    gt: new Date(date.setDate(date.getDate() - 1)),
                }

            }
        });
    }
    else if (q === "week") {
        const date = new Date();
        const weekDate = new Date(date.setDate(date.getDate() - 7));
        console.log(weekDate);
        data = await db.question.findMany({
            include: {
                user: true,
                votes: true,
                answers: true
            },
            where: {

                postedDate: {
                    gt: new Date(date.setDate(date.getDate() - 6)),
                    lt: weekDate,
                }
            }
        })
    }
    else {
        const date = new Date();
        const monthDate = new Date(date.setMonth(date.getMonth() - 1));
        data = await db.question.findMany({
            include: {
                user: true,
                votes: true,
                answers: true
            },
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