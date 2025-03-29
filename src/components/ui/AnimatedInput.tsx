import { motion } from "framer-motion";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { pulseGlow } from "@/lib/animations";
import { useState } from "react";

interface AnimatedInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  animate?: boolean;
}

export function AnimatedInput({ 
  className,
  label,
  animate = true,
  ...props 
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="relative w-full"
      initial="initial"
      animate={isFocused && animate ? "pulse" : "initial"}
      variants={pulseGlow}
    >
      {label && (
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block mb-2 text-sm text-muted-foreground lowercase"
        >
          {label}
        </motion.label>
      )}
      <Input
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "transition-all duration-300",
          isFocused && "transform scale-[1.02]",
          className
        )}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 origin-left"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
} 