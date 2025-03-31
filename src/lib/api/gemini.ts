import { google } from '@ai-sdk/google';
import { streamText, Message } from 'ai';

export function getGeminiStream(messages: Message[]) {
  return streamText({
    model: google('gemini-2.0-flash-lite'),
    messages,
    system: 'You are a thoughtful AI companion helping users with daily reflection and personal growth. Your responses should be empathetic, insightful, and encourage self-discovery.',
  });
} 