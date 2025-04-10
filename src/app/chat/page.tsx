"use client";

import { ChatInput } from "@/components/ui/chat-input";
import { ChatMessage } from "@/components/ui/chat-message";
import { Noise } from "@/components/ui/noise";
import { useChat, type Message } from 'ai/react';
import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';
import { DateSeparator } from "@/components/ui/date-separator";

type HistoricalMessage = Database['public']['Tables']['messages']['Row'];

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

type ChatItem = 
  | { type: 'message'; data: Message }
  | { type: 'date'; date: string; id: string };

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [historicalMessages, setHistoricalMessages] = useState<HistoricalMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        console.error("User not authenticated");
        setIsLoadingHistory(false);
      }
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      setIsLoadingHistory(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error("Error fetching chat history:", error);
      } else if (data) {
        setHistoricalMessages(data);
      }
      setIsLoadingHistory(false);
    };

    fetchHistory();
  }, [userId, supabase]);

  const { messages, input, handleInputChange, isLoading, append } = useChat({
    api: '/api/chat',
    streamProtocol: 'text',
    onResponse: (response) => {
      console.log('Raw response from API:', response);
    },
    onFinish: async (message) => {
      console.log('Finished message:', message);
      if (message.role === 'assistant') {
        try {
          const response = await fetch('/api/save-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: 'assistant', content: message.content })
          });
          if (!response.ok) {
            console.error("Failed to save assistant message:", await response.text());
          }
        } catch (error) {
          console.error("Error calling /api/save-message:", error);
        }
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });

  const chatItems = useMemo<ChatItem[]>(() => {
    const combinedMessages: Message[] = [
      ...historicalMessages.map(hm => ({
        id: hm.id.toString(),
        role: hm.role as 'user' | 'assistant', 
        content: hm.content ?? '',
        createdAt: hm.timestamp ? new Date(hm.timestamp) : new Date()
      })),
      ...messages
    ];

    combinedMessages.sort((a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0));

    const itemsWithDates: ChatItem[] = [];
    let lastDateString: string | null = null;

    combinedMessages.forEach((message) => {
      const messageDate = message.createdAt ? new Date(message.createdAt) : new Date();
      const currentDateString = messageDate.toDateString();

      if (currentDateString !== lastDateString) {
        const formattedDate = formatDate(messageDate.toISOString());
        itemsWithDates.push({ 
          type: 'date', 
          date: formattedDate, 
          id: `date-${currentDateString}`
        });
        lastDateString = currentDateString;
      }
      itemsWithDates.push({ type: 'message', data: message });
    });

    return itemsWithDates;
  }, [historicalMessages, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatItems]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (content: string) => {
    console.log('Sending message:', content);
    append({ role: 'user', content });
  };

  return (
    <div className="flex flex-col h-screen">
      <Noise />
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
            {isLoadingHistory && <p className="text-center text-foreground/50">Loading history...</p>}
            {!isLoadingHistory && chatItems.length === 0 && 
              <p className="text-center text-foreground/50">Start your conversation with Sage.</p>
            }
            {!isLoadingHistory && chatItems.map((item) => {
              if (item.type === 'date') {
                return <DateSeparator key={item.id} date={item.date} />;
              } else {
                return (
                  <ChatMessage
                    key={item.data.id}
                    content={item.data.content}
                    role={item.data.role as 'user' | 'assistant'}
                  />
                );
              }
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
              disabled={isLoading || isLoadingHistory}
              value={input}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 