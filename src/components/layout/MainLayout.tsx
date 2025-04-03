"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const showControls = pathname !== "/";

  return (
    <div className="relative min-h-screen">
      {showControls && (
        <div className="fixed top-6 right-6 flex items-center gap-3 z-50">
          <Button
            size="icon"
            variant="ghost"
            className="w-9 h-9 rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                <Avatar className="h-9 w-9 border border-[#333333]/10 dark:border-[#F9F1E8]/10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#333333]/5 dark:bg-[#F9F1E8]/5 text-sm lowercase">me</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#F9F1E8] dark:bg-[#333333] border-[#333333]/10 dark:border-[#F9F1E8]/10">
              <DropdownMenuItem className="cursor-pointer text-sm lowercase">
                <Link href="/profile" className="flex w-full">profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-sm lowercase">
                <Link href="/settings" className="flex w-full">settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#333333]/10 dark:bg-[#F9F1E8]/10" />
              <DropdownMenuItem className="cursor-pointer text-sm lowercase text-[#333333]/70 dark:text-[#F9F1E8]/70">
                log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {children}
    </div>
  );
} 