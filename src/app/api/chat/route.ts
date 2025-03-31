import { chatHandler } from '@/lib/api/chat';

export async function POST(req: Request) {
  return chatHandler(req);
} 