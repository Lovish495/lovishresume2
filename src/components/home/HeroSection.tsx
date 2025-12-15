import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Wrench, Mail, TrendingUp, BarChart3, PieChart, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-mesh opacity-80" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 animate-float rounded-full bg-secondary/20 blur-[100px]" />
        <div className="absolute -right-32 bottom-40 h-96 w-96 animate-float animation-delay-300 rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 animate-float animation-delay-500 rounded-full bg-accent/15 blur-[80px]" />
      </div>

      {/* Floating icons - hidden on mobile */}
      <div className="absolute inset-0 hidden overflow-hidden lg:block">
        <div className="absolute left-[8%] top-[25%] animate-float opacity-30">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <TrendingUp className="h-10 w-10 text-secondary" />
          </div>
        </div>
        <div className="absolute right-[12%] top-[20%] animate-float animation-delay-200 opacity-30">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-[30%] left-[15%] animate-float animation-delay-400 opacity-30">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <PieChart className="h-9 w-9 text-accent" />
          </div>
        </div>
        <div className="absolute bottom-[25%] right-[8%] animate-float animation-delay-300 opacity-25">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-secondary" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center lg:items-start lg:text-left">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
            <span className="text-sm font-medium text-white">CA Student & Finance Educator</span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-up text-4xl font-black leading-[1.1] tracking-tight text-white opacity-0 animation-delay-100 sm:text-5xl md:text-6xl lg:text-7xl">
            Finance.{" "}
            <span className="text-gradient">Learning.</span>
            <br />
            <span className="text-gradient-blue">Growth.</span>
          </h1>

          {/* Tagline */}
          <p className="mt-6 animate-fade-up text-lg font-medium text-white/90 opacity-0 animation-delay-200 sm:mt-8 sm:text-xl md:text-2xl">
            "From earnings to investments —{" "}
            <span className="text-secondary">design the life you deserve.</span>"
          </p>

          {/* Description */}
          <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-white/75 opacity-0 animation-delay-300 sm:mt-6 sm:text-lg">
            Hi, I'm <span className="font-bold text-white">Lovish Singhal</span> – a CA student and finance learner. 
            I decode the world of taxation, bonds, and investing for everyday people.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex animate-fade-up flex-col gap-3 opacity-0 animation-delay-400 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
              <Link to="/blog">
                <BookOpen className="mr-2 h-5 w-5" />
                Read My Blog
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/tools">
                <Wrench className="mr-2 h-5 w-5" />
                Explore Tools
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 animate-fade-up opacity-0 animation-delay-500 sm:mt-16">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md sm:gap-8 sm:px-8 lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary sm:text-3xl">50+</div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">Articles</div>
              </div>
              <div className="hidden h-10 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary sm:text-3xl">5K+</div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">Readers</div>
              </div>
              <div className="hidden h-10 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary sm:text-3xl">4</div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">Free Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:flex">
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
