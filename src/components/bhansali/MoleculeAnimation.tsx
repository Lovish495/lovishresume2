import { cn } from "@/lib/utils";

interface MoleculeAnimationProps {
  className?: string;
}

export function MoleculeAnimation({ className }: MoleculeAnimationProps) {
  return (
    <div className={cn("relative w-80 h-80", className)}>
      {/* Central node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-glow-lg animate-pulse-glow" />
      
      {/* Orbital rings */}
      <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-rotate-slow" style={{ animationDuration: '20s' }} />
      <div className="absolute inset-4 border border-secondary/20 rounded-full animate-rotate-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
      <div className="absolute inset-8 border border-primary/10 rounded-full animate-rotate-slow" style={{ animationDuration: '25s' }} />

      {/* Orbiting nodes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full shadow-glow-sm animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-glow-sm animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-glow-sm animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Corner nodes */}
      <div className="absolute top-[15%] left-[15%] w-3 h-3 bg-primary/60 rounded-full animate-pulse-glow floating" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[15%] right-[15%] w-3 h-3 bg-secondary/60 rounded-full animate-pulse-glow floating-slow" style={{ animationDelay: '0.6s' }} />
      <div className="absolute bottom-[15%] left-[15%] w-3 h-3 bg-accent/60 rounded-full animate-pulse-glow floating" style={{ animationDelay: '0.9s' }} />
      <div className="absolute bottom-[15%] right-[15%] w-3 h-3 bg-primary/60 rounded-full animate-pulse-glow floating-slow" style={{ animationDelay: '1.2s' }} />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(0deg)' }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Lines from center to edges */}
        <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="0%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        {/* Diagonal lines */}
        <line x1="50%" y1="50%" x2="15%" y2="15%" stroke="url(#lineGradient)" strokeWidth="0.5" />
        <line x1="50%" y1="50%" x2="85%" y2="15%" stroke="url(#lineGradient)" strokeWidth="0.5" />
        <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="url(#lineGradient)" strokeWidth="0.5" />
        <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="url(#lineGradient)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
