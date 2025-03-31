import { generateText, streamText, Message as AIMessage } from 'ai';
import { google } from '@ai-sdk/google';

export type Message = AIMessage;

export async function streamChatResponse(messages: Message[]) {
  const result = streamText({
    model: google('gemini-2.0-flash-lite'),
    messages,
    system: 'You are a thoughtful AI companion helping users with daily reflection and personal growth. Your responses should be empathetic, insightful, and encourage self-discovery.',
  });

  return result;
}

export async function chatHandler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response('Messages must be an array', { status: 400 });
    }

    const result = await streamChatResponse(messages);
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat error:', error);
    return new Response('Internal server error', { status: 500 });
  }
} 