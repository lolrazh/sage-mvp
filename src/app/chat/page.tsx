"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { ChatMessage } from "@/components/ui/chat-message";
import { useChat } from 'ai/react';
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [{
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm here to help you reflect and grow. What's on your mind today?"
    }]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (content: string) => {
    handleSubmit(new Event('submit') as any, { data: { content } });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent hover:scrollbar-thumb-foreground/20">
        <div className="max-w-[60%] mx-auto">
          <div className="py-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                role={message.role}
              />
            ))}
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