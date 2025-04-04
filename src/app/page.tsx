import { Button } from "@/components/ui/button"; // Assuming shadcn/ui setup
import Link from "next/link";
import { AuthTest } from '@/components/auth/AuthTest';

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <AuthTest />
    </main>
  );
} 