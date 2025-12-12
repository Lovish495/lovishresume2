import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-hero-gradient py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Let's Learn Together!
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80">
            Subscribe to my newsletter and get the latest insights on finance, taxation, 
            and investing delivered straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50"
            />
            <Button variant="hero" size="lg">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-sm text-primary-foreground/60">
            Join 1,000+ learners. No spam, unsubscribe anytime.
          </p>

          {/* Social Proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-secondary">50+</div>
              <div className="text-sm text-primary-foreground/80">Articles Published</div>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20" />
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-secondary">5K+</div>
              <div className="text-sm text-primary-foreground/80">Monthly Readers</div>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20" />
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-secondary">1K+</div>
              <div className="text-sm text-primary-foreground/80">Newsletter Subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
