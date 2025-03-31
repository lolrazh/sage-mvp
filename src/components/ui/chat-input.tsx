"use client";

import { Button } from "./button";
import { Textarea } from "./textarea";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
}

export function ChatInput({ 
  onSend, 
  disabled = false, 
  placeholder = "type anything...",
  minHeight = 48,
  maxHeight = 200
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  const adjustHeight = (reset = false) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = reset ? `${minHeight}px` : "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      
      // Check if text has wrapped
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      setIsWrapped(textarea.scrollHeight > lineHeight);
    }
  };

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
      adjustHeight(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          adjustHeight();
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "resize-none bg-background/50 backdrop-blur-sm border-foreground/10 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all px-4 py-3 pr-12",
          isWrapped ? "rounded-2xl" : "rounded-full",
          "scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent hover:scrollbar-thumb-foreground/20",
          `min-h-[${minHeight}px] max-h-[${maxHeight}px]`
        )}
        disabled={disabled}
      />
      <Button
        size="icon"
        className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-[#333333] hover:bg-[#333333]/90 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!message.trim() || disabled}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
} 