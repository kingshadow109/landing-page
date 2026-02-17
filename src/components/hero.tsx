import { WaitlistForm } from "./waitlist-form";
import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-zinc-300/30 dark:bg-zinc-700/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-8">
          <Sparkles className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Coming Soon
          </span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
          Fashion meets
          <br />
          <span className="bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-400 dark:to-zinc-100 bg-clip-text text-transparent">
            intelligence
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
          WearX uses AI to curate modern clothing and accessories tailored to your style. 
          Join the waitlist for early access to the future of fashion.
        </p>
        
        {/* Waitlist form */}
        <div className="mb-12">
          <WaitlistForm />
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">2,500+</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Early adopters</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-zinc-200 dark:bg-zinc-800" />
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">50+</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Countries</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-zinc-200 dark:bg-zinc-800" />
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">99.9%</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Uptime</div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
    </section>
  );
}
