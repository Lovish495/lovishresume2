import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Wrench, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-20 text-center md:items-start md:text-left">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-secondary" />
            CA Student & Finance Educator
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-up font-heading text-4xl font-bold leading-tight text-primary-foreground opacity-0 animation-delay-100 md:text-5xl lg:text-6xl">
            Finance. Learning.{" "}
            <span className="text-gradient">Growth.</span>
          </h1>

          {/* Tagline */}
          <p className="mt-6 animate-fade-up font-heading text-lg italic text-primary-foreground/80 opacity-0 animation-delay-200 md:text-xl">
            "From earnings to investments — design the life you deserve."
          </p>

          {/* Description */}
          <p className="mt-6 max-w-xl animate-fade-up text-lg text-primary-foreground/90 opacity-0 animation-delay-300">
            Hi, I'm <strong>Lovish Singhal</strong> – a CA student and finance learner. 
            I decode the world of taxation, bonds, and investing for everyday people.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-4 opacity-0 animation-delay-400 md:justify-start">
            <Button variant="hero" size="lg" asChild>
              <Link to="/blog">
                <BookOpen className="mr-2 h-5 w-5" />
                Read My Blog
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/tools">
                <Wrench className="mr-2 h-5 w-5" />
                Explore Tools
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="h-6 w-6 rotate-90 text-primary-foreground/60" />
        </div>
      </div>
    </section>
  );
}
