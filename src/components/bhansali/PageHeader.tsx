import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbs, className, children }: PageHeaderProps) {
  return (
    <section className={cn("relative pt-32 pb-16 bg-hero-gradient overflow-hidden", className)}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-mesh" />
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/15 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm mb-6 animate-fade-up">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {item.href ? (
                  <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up">
          <span className="text-gradient">{title}</span>
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-up animation-delay-100">
            {subtitle}
          </p>
        )}

        {/* Additional Content */}
        {children && (
          <div className="mt-8 animate-fade-up animation-delay-200">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
