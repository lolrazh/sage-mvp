import React from 'react';

interface DateSeparatorProps {
  date: string; // Expecting pre-formatted date string (e.g., "Today", "March 17")
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-foreground/10"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-2 text-xs text-foreground/50">
          {date}
        </span>
      </div>
    </div>
  );
}; 