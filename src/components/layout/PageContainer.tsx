import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
}

export function PageContainer({ 
  children, 
  className = "",
  withPadding = true 
}: PageContainerProps) {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        relative min-h-screen w-full
        flex flex-col items-center
        ${withPadding ? 'p-6 sm:p-8 md:p-12 lg:p-16 xl:p-24' : ''}
        ${className}
      `}
    >
      <div className="w-full max-w-2xl mx-auto">
        {children}
      </div>
    </motion.main>
  );
} 