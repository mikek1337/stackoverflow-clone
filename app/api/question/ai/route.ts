import { askGoogleAI } from "@/lib/ai/googleAi";
import { db } from "@/lib/db";

export async function GET(req:Request){
    const url = new URL(req.url);
    const questionId = url.searchParams.get("questionId");
    if(!questionId){
        console.log('bad request triggered ')
        return new Response("Bad request",{status:400});
    }
    const question = await db.question.findFirst({
        where:{
            id: questionId
        }
    });
    console.log(question)
    if(!question){
        return new Response("question not found", {status:404})
    }
    const aiAnswer = await askGoogleAI(question);
    const regex = RegExp('```', 'g');
    const aiText = aiAnswer.text?.replaceAll(regex, ''); 
    return new Response(aiText?.replace('json',''),{status:200});
}