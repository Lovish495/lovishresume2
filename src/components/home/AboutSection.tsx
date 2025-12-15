import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, TrendingUp, Award, BookOpen } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    label: "CA Aspirant",
    description: "Dedicated to becoming a Chartered Accountant",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: TrendingUp,
    label: "Finance Educator",
    description: "Simplifying complex financial concepts",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Award,
    label: "Content Creator",
    description: "Sharing knowledge through blogs and tools",
    color: "bg-accent/10 text-accent-foreground",
  },
];

const stats = [
  { value: "50+", label: "Articles" },
  { value: "5K+", label: "Readers" },
  { value: "4", label: "Tools" },
];

export function AboutSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Side */}
          <div className="relative order-2 mx-auto max-w-md lg:order-1 lg:mx-0">
            {/* Main card */}
            <div className="relative overflow-hidden rounded-3xl bg-hero p-8 shadow-2xl">
              <div className="absolute inset-0 bg-mesh opacity-60" />
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary shadow-glow">
                  <span className="text-4xl font-bold text-white">L</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Lovish Singhal</h3>
                <p className="mt-2 text-white/80">CA Student | Finance Educator</p>
                
                {/* Stats */}
                <div className="mt-8 flex w-full justify-around border-t border-white/20 pt-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-bold text-secondary">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-2xl bg-secondary/20 blur-sm" />
            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-muted" />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary">
              <BookOpen className="h-4 w-4" />
              About Me
            </span>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Decoding Finance for{" "}
              <span className="text-gradient">Everyday People</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm passionate about making financial literacy accessible to everyone. 
              As a CA student, I combine academic knowledge with practical insights 
              to help you understand taxation, bonds, and investing.
            </p>
            <p className="mt-4 text-muted-foreground">
              My mission is to empower individuals to take control of their financial 
              future through education and actionable guidance.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className={`mb-3 inline-flex rounded-lg p-2 ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-foreground">{item.label}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg" className="mt-8" asChild>
              <Link to="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
