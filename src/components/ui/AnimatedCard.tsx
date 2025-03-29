import { motion } from "framer-motion";
import { expandCard } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function AnimatedCard({
  children,
  className,
  selected = false,
  onClick,
  disabled = false
}: AnimatedCardProps) {
  return (
    <motion.div
      variants={expandCard}
      initial="initial"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      animate={selected ? "selected" : "initial"}
      onClick={disabled ? undefined : onClick}
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card p-6",
        "transition-colors duration-300",
        selected && "border-foreground",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
    >
      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Selection indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary"
        />
      )}
    </motion.div>
  );
} 