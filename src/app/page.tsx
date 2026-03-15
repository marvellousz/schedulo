"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Calendar, 
  ArrowRight, 
  Mail, 
  Zap,
  Globe,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite selection:bg-brand-primary selection:text-white">
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-offwhite/80 backdrop-blur-md border-b border-brand-gray">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-brand-primary flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xl font-mono uppercase tracking-[0.2em] font-bold">
              Schedulo
            </span>
          </Link>
          
          <nav className="flex items-center space-x-4 md:space-x-12">
            <Link href="#features" className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-muted hover:text-brand-primary transition-colors">Features</Link>
            <Link href="/login">
              <button className="bg-brand-primary text-white font-mono uppercase text-[10px] tracking-[0.2em] px-4 md:px-6 py-2.5 md:py-3 flex items-center group">
                <span className="relative z-10">Sign In</span>
                <ArrowRight className="ml-2 md:ml-3 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 px-6 text-center overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="container mx-auto relative"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="cypher-heading text-4xl sm:text-5xl md:text-8xl mb-8 tracking-tighter md:tracking-[0.2em]"
            >
              Scheduling <br className="hidden sm:block" />
              <span className="text-brand-primary opacity-60">Made Easy</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted max-w-xl mx-auto mb-12 font-sans leading-relaxed"
            >
              Organize your meetings and emails in one place. Simple, fast, and connected directly to your Google Calendar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link href="/login">
                <button className="bg-brand-primary text-white font-mono uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] px-8 md:px-10 py-4 md:py-5 flex items-center group shadow-xl shadow-brand-primary/10">
                  <span>Start Scheduling</span>
                  <ArrowRight className="ml-4 md:ml-6 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </motion.div>

            <div className="mt-24 tech-divider max-w-4xl mx-auto"></div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-24">
              <h2 className="cypher-heading text-4xl md:text-6xl mb-4">Core Features</h2>
              <p className="text-muted max-w-lg mx-auto">Everything you need to manage your time better.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Editor",
                  desc: "Write beautiful invitations with a built-in editor that supports custom templates.",
                  icon: <Mail className="w-5 h-5" />
                },
                {
                  title: "Calendar Sync",
                  desc: "Automatically create Google Meet links and sync events to your Google Calendar.",
                  icon: <Calendar className="w-5 h-5" />
                },
                {
                  title: "Fast Setup",
                  desc: "Connect your account once and start scheduling meetings in less than 30 seconds.",
                  icon: <Zap className="w-5 h-5" />
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white border border-brand-gray p-10 group hover:border-brand-primary transition-colors">
                  <div className="w-10 h-10 bg-brand-offwhite flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="cypher-heading text-lg mb-4">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple CTA */}
        <section className="py-32 px-6 border-y border-brand-gray bg-white overflow-hidden relative">
          <div className="container mx-auto relative z-10 text-center">
            <h2 className="cypher-heading text-4xl md:text-6xl mb-12">Ready to try it out?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/login">
                <button className="bg-brand-primary text-white font-mono uppercase text-sm tracking-[0.3em] px-10 py-5 flex items-center group">
                  <span>Get Started</span>
                  <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="https://www.marvlock.dev" target="_blank" className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-brand-primary transition-colors flex items-center">
                <Globe className="mr-3 w-4 h-4" />
                Visit Website
              </Link>
            </div>
          </div>
          {/* Decorative Grid */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative py-32 px-6 bg-brand-offwhite border-t border-brand-gray overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -bottom-24 -right-24 text-[20vw] font-mono font-black text-brand-gray opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter">
          Schedulo
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
            <div className="md:col-span-8 space-y-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-brand-primary flex items-center justify-center text-white">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-2xl font-mono uppercase tracking-[0.2em] font-bold">Schedulo</span>
              </Link>
              <p className="text-muted text-xs font-mono uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                A simple tool for a complicated world. <br />
                Built for focus and efficiency.
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col md:items-end justify-start">
              <div className="space-y-6">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary font-bold">Project</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/privacy" className="text-[10px] font-mono text-muted hover:text-brand-primary uppercase tracking-[0.2em] transition-all flex items-center group">
                      <div className="w-1 h-1 bg-brand-gray group-hover:bg-brand-primary mr-3 transition-colors"></div>
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-[10px] font-mono text-muted hover:text-brand-primary uppercase tracking-[0.2em] transition-all flex items-center group">
                      <div className="w-1 h-1 bg-brand-gray group-hover:bg-brand-primary mr-3 transition-colors"></div>
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="tech-divider mt-24 mb-12"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em] text-muted space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} / Schedulo Open Source</p>
            <div className="flex items-center space-x-2">
              <span>Made with ❤️ by</span>
              <Link 
                href="https://www.marvlock.dev" 
                target="_blank" 
                className="font-bold italic hover:text-brand-primary transition-colors lowercase tracking-normal"
              >
                marvlock
              </Link>
            </div>
          </div>
        </div>

        {/* Blueprint Markers */}
        <div className="absolute top-0 left-0 p-8"><Plus className="w-4 h-4 text-brand-gray" /></div>
        <div className="absolute top-0 right-0 p-8"><Plus className="w-4 h-4 text-brand-gray" /></div>
        <div className="absolute bottom-10 left-10"><Plus className="w-4 h-4 text-brand-gray opacity-30" /></div>
      </footer>
    </div>
  );
}
