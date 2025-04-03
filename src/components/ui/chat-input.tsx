"use client";

import { Button } from "./button";
import { Textarea } from "./textarea";
import { ArrowUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ChatInput({ 
  onSend, 
  disabled = false, 
  placeholder = "type anything...",
  minHeight = 48,
  maxHeight = 216, // 9 lines * 24px line height
  value,
  onChange
}: ChatInputProps) {
  const [message, setMessage] = useState(value || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${minHeight}px`;
      setIsWrapped(false);
      setNeedsScroll(false);
    }
  };

  const adjustHeight = (reset = false) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = reset ? `${minHeight}px` : "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      
      // If height is greater than minHeight, text has wrapped
      setIsWrapped(textarea.offsetHeight > minHeight);
      
      // If height is greater than maxHeight, we need scrollbar
      setNeedsScroll(textarea.offsetHeight > maxHeight);
    }
  };

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
      // Use requestAnimationFrame to ensure state updates before reset
      requestAnimationFrame(resetHeight);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);
    onChange?.(e);
    adjustHeight();
  };

  useEffect(() => {
    if (value !== undefined) {
      setMessage(value);
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "resize-none bg-background/50 backdrop-blur-sm border-foreground/10 focus-visible:ring-1 focus-visible:ring-foreground/20 px-4 py-3 pr-12",
          "transition-[border-radius] duration-75",
          isWrapped ? "rounded-[24px]" : "rounded-full",
          needsScroll ? "overflow-y-auto" : "overflow-hidden",
          `min-h-[${minHeight}px] max-h-[${maxHeight}px]`,
          "[transition:height_0s] [transition-property:height]"
        )}
        disabled={disabled}
      />
      <Button
        size="icon"
        className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-foreground hover:bg-foreground/90 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!message.trim() || disabled}
      >
        <ArrowUp className="h-4 w-4 text-background" />
      </Button>
      <style jsx global>{`
        .chat-input textarea::-webkit-scrollbar,
        .chat-input textarea::-moz-scrollbar {
          width: 3px;
          background: transparent;
        }
        .chat-input textarea::-webkit-scrollbar-track,
        .chat-input textarea::-moz-scrollbar-track {
          background: transparent;
        }
        .chat-input textarea::-webkit-scrollbar-thumb,
        .chat-input textarea::-moz-scrollbar-thumb {
          background-color: rgba(51, 51, 51, 0.15);
          border-radius: 3px;
        }
        .chat-input textarea:hover::-webkit-scrollbar-thumb,
        .chat-input textarea:hover::-moz-scrollbar-thumb {
          background-color: rgba(51, 51, 51, 0.25);
        }
        .chat-input textarea::-webkit-scrollbar-button,
        .chat-input textarea::-moz-scrollbar-button {
          display: none;
        }
      `}</style>
    </div>
  );
}