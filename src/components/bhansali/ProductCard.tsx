import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  fullName: string;
  description: string;
  features: string[];
  className?: string;
}

export function ProductCard({ id, name, fullName, description, features, className }: ProductCardProps) {
  return (
    <Link 
      to={`/product-details/${id}`}
      className={cn("product-card block", className)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{fullName}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {features.slice(0, 4).map((feature, index) => (
            <span 
              key={index}
              className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-glow" />
      </div>
    </Link>
  );
}
