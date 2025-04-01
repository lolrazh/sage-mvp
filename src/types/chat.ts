export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp?: number;
}

export interface ChatRequest {
  messages: Message[];
}

export interface ChatResponse {
  error?: string;
  message?: Message;
} 