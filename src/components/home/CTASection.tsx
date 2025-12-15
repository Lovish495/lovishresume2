import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-hero py-16 md:py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh opacity-60" />
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-secondary/20 blur-[100px]" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />
      
      <div className="container relative z-10 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-white">Join the Community</span>
          </div>
          
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Let's Learn Together!
          </h2>
          <p className="mt-4 text-base text-white/80 sm:mt-6 sm:text-lg">
            Subscribe to my newsletter and get the latest insights on finance, taxation, 
            and investing delivered straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-xl border border-white/20 bg-white/10 pl-12 pr-4 text-white placeholder:text-white/50 backdrop-blur-sm transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 sm:h-14"
              />
            </div>
            <Button variant="hero" size="lg" className="h-12 sm:h-14">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-sm text-white/60">
            Join 1,000+ learners. No spam, unsubscribe anytime.
          </p>

          {/* Social Proof */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm sm:gap-8 sm:px-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary sm:text-3xl">50+</div>
              <div className="text-xs text-white/70 sm:text-sm">Articles Published</div>
            </div>
            <div className="hidden h-10 w-px bg-white/20 sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary sm:text-3xl">5K+</div>
              <div className="text-xs text-white/70 sm:text-sm">Monthly Readers</div>
            </div>
            <div className="hidden h-10 w-px bg-white/20 sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary sm:text-3xl">1K+</div>
              <div className="text-xs text-white/70 sm:text-sm">Newsletter Subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
