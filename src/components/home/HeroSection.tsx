import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Wrench, Mail, TrendingUp, BarChart3, Coins } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with gradient mesh */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-hero-gradient opacity-95" />
        <div className="absolute inset-0 bg-mesh" />
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 animate-float rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-40 h-96 w-96 animate-float animation-delay-200 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 animate-float animation-delay-400 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 hidden overflow-hidden lg:block">
        <div className="absolute left-[10%] top-[20%] animate-float opacity-20">
          <TrendingUp className="h-16 w-16 text-secondary" />
        </div>
        <div className="absolute right-[15%] top-[30%] animate-float animation-delay-300 opacity-20">
          <BarChart3 className="h-12 w-12 text-primary-foreground" />
        </div>
        <div className="absolute bottom-[25%] left-[20%] animate-float animation-delay-500 opacity-20">
          <Coins className="h-14 w-14 text-gold" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center py-24 text-center md:items-start md:text-left">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
            CA Student & Finance Educator
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-up font-heading text-5xl font-bold leading-tight text-primary-foreground opacity-0 animation-delay-100 md:text-6xl lg:text-7xl">
            Finance.{" "}
            <span className="text-gradient">Learning.</span>
            <br />
            <span className="text-gradient-blue">Growth.</span>
          </h1>

          {/* Tagline */}
          <p className="mt-8 animate-fade-up text-xl font-medium text-primary-foreground/90 opacity-0 animation-delay-200 md:text-2xl">
            "From earnings to investments —{" "}
            <span className="text-secondary">design the life you deserve.</span>"
          </p>

          {/* Description */}
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-primary-foreground/80 opacity-0 animation-delay-300">
            Hi, I'm <span className="font-semibold text-primary-foreground">Lovish Singhal</span> – a CA student and finance learner. 
            I decode the world of taxation, bonds, and investing for everyday people.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex animate-fade-up flex-wrap justify-center gap-4 opacity-0 animation-delay-400 md:justify-start">
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/blog">
                <BookOpen className="mr-2 h-5 w-5" />
                Read My Blog
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="group" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="group" asChild>
              <Link to="/tools">
                <Wrench className="mr-2 h-5 w-5" />
                Explore Tools
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 animate-fade-up opacity-0 animation-delay-500">
            <div className="inline-flex items-center gap-8 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-8 py-5 backdrop-blur-md">
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-secondary">50+</div>
                <div className="mt-1 text-sm text-primary-foreground/70">Articles</div>
              </div>
              <div className="h-10 w-px bg-primary-foreground/20" />
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-secondary">5K+</div>
                <div className="mt-1 text-sm text-primary-foreground/70">Readers</div>
              </div>
              <div className="h-10 w-px bg-primary-foreground/20" />
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-secondary">4</div>
                <div className="mt-1 text-sm text-primary-foreground/70">Free Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary-foreground/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-primary-foreground/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
