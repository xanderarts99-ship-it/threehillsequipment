"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors mb-8">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/40">Enter your credentials to manage inventory.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-xs font-bold uppercase text-white/60 mb-2">Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 text-white p-4 focus:border-[var(--gold)] focus:outline-none transition-colors"
                    placeholder="admin@threehills.com"
                    required
                />
            </div>
            
            <div>
                <label className="block text-xs font-bold uppercase text-white/60 mb-2">Password</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 text-white p-4 focus:border-[var(--gold)] focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                />
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-sm">
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 hover:bg-[var(--gold)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? "Signing in..." : "Sign In"}
            </button>
        </form>
      </div>
    </div>
  );
}
