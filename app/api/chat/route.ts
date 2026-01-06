import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Missing Google API Key" }), { status: 500 });
        }

        const { messages } = await req.json();
        console.log("Processing chat with messages:", messages.length);

        const result = await streamText({
            model: google('gemini-1.5-flash'),
            messages,
            system: "You are a helpful AI study assistant for students. You help with homework, explain concepts, and provide study tips. Be encouraging and clear."
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
    }
}
