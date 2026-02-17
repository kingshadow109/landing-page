"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    setStatus("loading");
    
    // TODO: Connect to waitlist API
    // For now, simulate success
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Build Something
            <span className="text-primary"> Amazing</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the waitlist for early access. Be among the first to experience 
            the future of AI-powered development.
          </p>

          {/* Waitlist Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4"
              disabled={status === "loading" || status === "success"}
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={status === "loading" || status === "success"}
              className="h-12 px-6"
            >
              {status === "loading" ? (
                "Joining..."
              ) : status === "success" ? (
                "You're on the list!"
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {status === "success" && (
            <p className="text-sm text-green-600 mb-8">
              Thanks! We&apos;ll notify you when we launch.
            </p>
          )}

          {/* Social Proof */}
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">500+</span> developers on the waitlist
          </p>
        </div>
      </div>
    </section>
  );
}
