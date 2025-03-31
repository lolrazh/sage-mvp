import { generateText, Message as AIMessage } from 'ai';
import { google } from '@ai-sdk/google';

export type Message = AIMessage;

export async function getChatResponse(messages: Message[]) {
  console.log('Incoming messages:', JSON.stringify(messages, null, 2));
  
  try {
    const { text } = await generateText({
      model: google('gemini-2.0-flash-lite'),
      messages,
      system: 'You are a thoughtful AI companion helping users with daily reflection and personal growth. Your responses should be empathetic, insightful, and encourage self-discovery.',
    });
    
    console.log('Generated response:', text);
    return text;
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    throw error;
  }
}

export async function chatHandler(req: Request) {
  console.log('Request method:', req.method);
  
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { messages } = body;
    if (!Array.isArray(messages)) {
      console.error('Invalid messages format:', messages);
      return new Response('Messages must be an array', { status: 400 });
    }

    const text = await getChatResponse(messages);
    
    // Format exactly as useChat expects
    const response = {
      messages: [
        ...messages,
        {
          id: Date.now().toString(),
          role: 'assistant' as const,
          content: text,
          createdAt: new Date()
        }
      ],
      data: null
    };
    
    console.log('Sending response:', JSON.stringify(response, null, 2));
    
    return new Response(
      JSON.stringify(response), 
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Detailed chat error:', {
      name: error?.name || 'Unknown error',
      message: error?.message || 'No error message',
      stack: error?.stack || 'No stack trace',
    });
    return new Response('Internal server error', { status: 500 });
  }
} 