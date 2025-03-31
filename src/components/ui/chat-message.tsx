"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
}

export function ChatMessage({ content, role }: ChatMessageProps) {
  const isUser = role === "user";
  const messageRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    if (messageRef.current) {
      const message = messageRef.current;
      const lineHeight = parseInt(getComputedStyle(message).lineHeight);
      setIsWrapped(message.scrollHeight > lineHeight);
    }
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3 p-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#333333]/10 flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4" />
        </div>
      )}
      <div
        ref={messageRef}
        className={cn(
          "max-w-[80%] px-4 py-3 break-words whitespace-pre-wrap transition-[border-radius] duration-75",
          isWrapped ? "rounded-[24px]" : "rounded-full",
          isUser
            ? "bg-[#333333] text-white"
            : "bg-[#333333]/5 text-foreground"
        )}
      >
        <p className="text-sm">{content}</p>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#333333]/10 flex items-center justify-center shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
} 