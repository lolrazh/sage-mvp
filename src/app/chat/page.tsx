"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { ChatMessage } from "@/components/ui/chat-message";
import { Noise } from "@/components/ui/noise";
import { useChat } from 'ai/react';
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    streamProtocol: 'text',
    initialMessages: [{
      id: 'welcome',
      role: 'assistant',
      content: "hi! i'm sage :)"
    }],
    onResponse: (response) => {
      console.log('Raw response from API:', response);
    },
    onFinish: (message) => {
      console.log('Finished message:', message);
    },
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });

  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (content: string) => {
    console.log('Sending message:', content);
    handleSubmit(new Event('submit') as any, { data: { content } });
  };

  return (
    <div className="flex flex-col h-screen">
      <Noise />
      {/* Header with Back Button and Icon */}
      <div className="fixed top-0 left-0 right-0 p-6 flex items-center">
        <Link href="/home" className="inline-flex items-center text-foreground/70 hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border border-foreground/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4 0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6s-1-.2-1.4-.6c-.4-.4-.6-.9-.6-1.4 0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6zM12 17c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4 0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6s-1-.2-1.4-.6c-.4-.4-.6-.9-.6-1.4 0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6zM12 10c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4 0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6s-1-.2-1.4-.6c-.4-.4-.6-.9-.6-1.4 0-.5.2-1 .6-1.4.4-.4.9-.6 1.4-.6z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent hover:scrollbar-thumb-foreground/20">
        <div className="max-w-[60%] mx-auto">
          <div className="py-4 pt-20">
            {messages.map((message) => {
              console.log('Rendering message:', message);
              return (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  role={message.role}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm">
        <div className="max-w-[60%] mx-auto p-4">
          <div className="chat-input">
            <ChatInput 
              onSend={handleSend}
              disabled={isLoading}
              value={input}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 