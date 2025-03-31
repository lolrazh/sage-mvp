import { getGeminiStream } from '@/lib/api/gemini';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const result = await getGeminiStream(messages);
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Error processing chat request', { status: 500 });
  }
} 