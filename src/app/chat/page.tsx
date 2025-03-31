"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { ChatMessage } from "@/components/ui/chat-message";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
    };

    setMessages((prev) => [...prev, newMessage]);

    // TODO: Send to AI and handle response
    // For now, just echo back
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help you with your daily reflection and personal growth journey.",
        role: "assistant",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent hover:scrollbar-thumb-foreground/20">
        <div className="max-w-[60%] mx-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Start a conversation to begin your daily reflection</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm">
        <div className="max-w-[60%] mx-auto p-4">
          <div className="chat-input">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
} 