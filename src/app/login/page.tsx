"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Globe, Loader2, ArrowLeft, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Failed to sign in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-brand-offwhite selection:bg-brand-primary selection:text-white overflow-hidden relative">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Technical Grid */}
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        
        {/* Dot Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>

        {/* Dynamic Blobs */}
        <div className="bg-blob bg-blob-primary w-[500px] h-[500px] -top-48 -left-48"></div>
        <div className="bg-blob bg-blob-primary w-[400px] h-[400px] top-1/2 -right-24 delay-1000"></div>
        <div className="bg-blob bg-blob-secondary w-[600px] h-[600px] -bottom-48 left-1/4"></div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6">
        <div className="container mx-auto h-20 flex items-center">
          <Link href="/" className="flex items-center space-x-2 text-muted hover:text-brand-primary transition-colors group font-mono text-[10px] uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col justify-center items-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-brand-offwhite border border-brand-gray p-10 md:p-12 relative shadow-sm">
            <div className="relative z-10">
              {/* Logo/Icon */}
              <div className="flex justify-start mb-8">
                <div className="w-10 h-10 bg-brand-primary flex items-center justify-center text-white">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              {/* Welcome text */}
              <div className="mb-8">
                <h1 className="cypher-heading text-3xl md:text-5xl mb-4 leading-none">Welcome <br /> Back</h1>
                <p className="text-muted text-xs font-sans leading-relaxed">Sign in with Google to access your meeting terminal.</p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-8 border-l-2 border-brand-primary bg-brand-primary/5 p-4">
                  <p className="text-[10px] font-mono uppercase text-brand-primary">{error}</p>
                </div>
              )}

              {/* Google Sign In Button */}
              <div className="space-y-6">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full h-16 bg-brand-primary text-white font-mono uppercase text-[10px] tracking-[0.3em] px-8 flex items-center justify-between group transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  <div className="flex items-center">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-6" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 mr-6 brightness-200 grayscale">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                      </svg>
                    )}
                    <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-12 pt-8 border-t border-brand-gray">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Calendar Sync",
                    "Meet Integration"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center text-[8px] font-mono text-muted uppercase tracking-widest">
                      <div className="w-1 h-1 bg-brand-primary mr-2"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center space-y-4">
            <Link 
              href="https://www.marvlock.dev" 
              target="_blank"
              className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted hover:text-brand-primary transition-colors flex items-center"
            >
              <Globe className="w-3.5 h-3.5 mr-3" />
              <span>Made by <span className="font-bold italic lowercase">marvlock</span></span>
            </Link>
            <p className="text-[9px] font-mono text-muted text-center uppercase tracking-widest opacity-80">
              © {new Date().getFullYear()} Schedulo
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

