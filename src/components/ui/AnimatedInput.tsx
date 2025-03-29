import { motion } from "framer-motion";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnimatedInputProps extends React.ComponentProps<typeof Input> {}

export function AnimatedInput({ className, ...props }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  return (
    <motion.div 
      className="relative w-full group"
      animate={{ 
        scale: isFocused ? 1.02 : 1,
        transition: { 
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1]
        }
      }}
    >
      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0 rounded-md bg-primary/5"
        initial={false}
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <Input
        {...props}
        onChange={handleChange}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "relative z-10",
          "transition-all duration-300",
          "border-transparent",
          "bg-transparent backdrop-blur-sm",
          "placeholder:text-muted-foreground/50",
          "hover:border-foreground/10",
          isFocused && "border-foreground/20",
          hasValue && "text-foreground",
          !hasValue && "text-foreground/70",
          className
        )}
      />

      {/* Underline effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-px bg-foreground/20"
        initial={{ width: "0%" }}
        animate={{ 
          width: isFocused ? "100%" : "0%",
          x: isFocused ? "-50%" : "0%"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
} 