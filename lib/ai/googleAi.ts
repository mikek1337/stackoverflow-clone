import { GoogleGenAI,  } from '@google/genai';


export async function askGoogleAI(question:any){
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});
    console.log('here');
    const response = await ai.models.generateContent({
        model:'gemini-2.0-flash',
        contents:'Answer the following question provided in a editorjs json format as best as you can '+
        'and make sure that your response in the same editorjs format'+JSON.stringify(question)
    })
    

    return response;
}