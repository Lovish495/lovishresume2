import { TrendingUp, TrendingDown } from "lucide-react";
import { financialSnapshot } from "@/data/bhansali/companyData";

export function StockTicker() {
  const { stockInfo } = financialSnapshot;
  const isPositive = stockInfo.isPositive;

  return (
    <div className="bg-card/50 border-y border-border/50 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-8">
          {/* Stock Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">BSE: BEPL</span>
              <span className="font-mono font-semibold text-foreground">₹{stockInfo.currentPrice.toFixed(2)}</span>
              <span className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-secondary' : 'text-destructive'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive ? '+' : ''}{stockInfo.change.toFixed(2)} ({stockInfo.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
              <span>52W H: <span className="text-foreground font-medium">₹{stockInfo.high52Week}</span></span>
              <span>52W L: <span className="text-foreground font-medium">₹{stockInfo.low52Week}</span></span>
              <span>MCap: <span className="text-foreground font-medium">{stockInfo.marketCap}</span></span>
            </div>
          </div>

          {/* Financial Highlights Ticker */}
          <div className="hidden lg:block flex-1 overflow-hidden">
            <div className="ticker-scroll flex items-center gap-8 whitespace-nowrap">
              {[...financialSnapshot.metrics, ...financialSnapshot.metrics].map((metric, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{metric.label}:</span>
                  <span className="text-sm font-semibold text-foreground">{metric.displayValue}</span>
                  <span className={`text-xs ${metric.isPositive ? 'text-secondary' : 'text-destructive'}`}>
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
