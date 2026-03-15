"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Calendar, Loader2 } from "lucide-react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") || "Unknown error";

  const errorMessages: Record<string, string> = {
    Configuration: "Server configuration mismatch detected. Check environment variables (AUTH_SECRET).",
    AccessDenied: "Access denied. You do not have permission to view this terminal.",
    Verification: "Security token expired or invalid. Please request a new sequence.",
    OAuthSignin: "Google authentication handshake failed. The uplink was rejected.",
    OAuthCallback: "The authentication return sequence was interrupted. Try again.",
    OAuthCreateAccount: "Failed to initialize new user profile in the database.",
    EmailCreateAccount: "Email registration protocol failure.",
    Callback: "Internal authentication handler error. Protocol aborted.",
    OAuthAccountNotLinked: "Account conflict. This identity is linked to another provider.",
    default: "An unexpected system anomaly has occurred. Sequence terminated."
  };

  const errorMessage = errorMessages[error] || errorMessages.default;

  return (
    <div className="flex flex-col h-[100dvh] bg-brand-offwhite selection:bg-brand-primary selection:text-white overflow-hidden relative">
      {/* Background Layer (Same as Login/Landing) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>
        <div className="bg-blob bg-blob-primary w-[500px] h-[500px] -top-48 -left-48 opacity-20"></div>
        <div className="bg-blob bg-blob-secondary w-[600px] h-[600px] -bottom-48 left-1/4 opacity-10"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <main className="flex-grow flex flex-col justify-center items-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-brand-offwhite border border-brand-primary p-10 md:p-12 relative shadow-2xl">
            {/* Error Header Decorator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="flex justify-start mb-10">
                <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              {/* Error Details */}
              <div className="mb-12">
                <h1 className="cypher-heading text-3xl md:text-5xl mb-6 leading-none">Access <br /> Restricted</h1>
                
                <div className="flex items-center space-x-3 mb-8">
                    <div className="px-2 py-1 bg-brand-primary text-white text-[8px] font-mono font-black uppercase tracking-widest">
                        ERROR
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest">
                        {error.toUpperCase()}
                    </span>
                </div>

                <p className="text-muted text-xs font-sans leading-relaxed max-w-[280px]">
                  {errorMessage}
                </p>
              </div>

              {/* Action */}
              <div className="pt-10 border-t border-brand-gray">
                <Link href="/login">
                  <button className="w-full h-16 bg-brand-primary text-white font-mono uppercase text-[10px] tracking-[0.3em] px-8 flex items-center justify-between group transition-all hover:brightness-110 active:scale-[0.98]">
                    <div className="flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Reset Sequence</span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3 text-muted opacity-60">
                <div className="w-1 h-1 bg-brand-primary animate-pulse"></div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Schedulo Diagnostic Terminal</span>
            </div>
            <p className="text-[9px] font-mono text-muted text-center uppercase tracking-widest opacity-80">
              © {new Date().getFullYear()} / System Protocol 401
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[100dvh] items-center justify-center bg-brand-offwhite">
        <Loader2 className="w-6 h-6 text-brand-primary animate-spin" />
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}