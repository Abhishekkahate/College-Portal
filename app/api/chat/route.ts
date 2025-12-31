import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: google('gemini-1.5-pro-latest'),
        messages,
        system: "You are a helpful AI study assistant for students. You help with homework, explain concepts, and provide study tips. Be encouraging and clear."
    });

    return result.toTextStreamResponse();
}
