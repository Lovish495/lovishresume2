import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialCardProps {
  label: string;
  value: number;
  displayValue: string;
  change: string;
  isPositive: boolean;
  delay?: number;
}

export function FinancialCard({ label, value, displayValue, change, isPositive, delay = 0 }: FinancialCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(interval);
      } else {
        setAnimatedValue(current);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value, isVisible]);

  return (
    <div 
      className={cn(
        "data-card opacity-0 transition-all duration-500",
        isVisible && "opacity-100 animate-fade-up"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          isPositive ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <div className="font-mono text-2xl md:text-3xl font-bold text-foreground">
        {displayValue}
      </div>
      <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
          style={{ width: isVisible ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}
