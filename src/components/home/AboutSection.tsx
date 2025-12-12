import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, TrendingUp, Award } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    label: "CA Aspirant",
    description: "Dedicated to becoming a Chartered Accountant",
  },
  {
    icon: TrendingUp,
    label: "Finance Educator",
    description: "Simplifying complex financial concepts",
  },
  {
    icon: Award,
    label: "Content Creator",
    description: "Sharing knowledge through blogs and tools",
  },
];

export function AboutSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-md overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-hero-gradient opacity-90" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                  <span className="font-heading text-4xl font-bold text-secondary-foreground">L</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary-foreground">Lovish Singhal</h3>
                <p className="mt-2 text-primary-foreground/80">CA Student | Finance Learner</p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-secondary/20" />
            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-muted" />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-medium uppercase tracking-wider text-secondary">
              About Me
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Decoding Finance for{" "}
              <span className="text-gradient">Everyday People</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
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
                <div key={item.label} className="rounded-lg bg-muted p-4">
                  <item.icon className="h-6 w-6 text-secondary" />
                  <h4 className="mt-2 font-semibold text-foreground">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
