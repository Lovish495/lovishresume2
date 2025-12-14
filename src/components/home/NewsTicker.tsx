import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const marketData = [
  { symbol: "NIFTY 50", value: "24,768.25", change: "+0.42%", up: true },
  { symbol: "SENSEX", value: "81,523.16", change: "+0.38%", up: true },
  { symbol: "BANK NIFTY", value: "53,845.30", change: "-0.15%", up: false },
  { symbol: "INR/USD", value: "84.85", change: "+0.12%", up: true },
  { symbol: "GOLD", value: "₹76,450", change: "+1.24%", up: true },
  { symbol: "CRUDE OIL", value: "$73.42", change: "-0.85%", up: false },
  { symbol: "10Y GSEC", value: "6.76%", change: "-2bps", up: false },
  { symbol: "NIFTY IT", value: "44,125.80", change: "+1.15%", up: true },
];

const breakingNews = [
  "BREAKING: Prachay Capital NCD Issue Opens at 13% - Apply Before Dec 23",
  "RBI Holds Repo Rate Steady at 6.5% Amid Growth Concerns",
  "India's Bond Yields Drop to 4-Year Low as FII Inflows Surge",
  "SEBI Approves New Framework for Bond ETFs",
];

export function NewsTicker() {
  return (
    <div className="bg-primary text-primary-foreground">
      {/* Breaking News Bar */}
      <div className="bg-destructive/90 py-1.5">
        <div className="flex items-center overflow-hidden">
          <div className="shrink-0 bg-destructive px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
            Breaking
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="ticker-scroll flex whitespace-nowrap">
              {[...breakingNews, ...breakingNews].map((news, i) => (
                <span key={i} className="mx-8 text-sm font-medium">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market Data Ticker */}
      <div className="border-b border-primary-foreground/10 py-2">
        <div className="container">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
              Markets
            </span>
            {marketData.map((item) => (
              <div key={item.symbol} className="flex shrink-0 items-center gap-2">
                <span className="text-xs font-medium text-primary-foreground/80">
                  {item.symbol}
                </span>
                <span className="font-mono text-sm font-semibold">
                  {item.value}
                </span>
                <span
                  className={`flex items-center gap-0.5 font-mono text-xs font-semibold ${
                    item.up ? "text-secondary" : "text-destructive"
                  }`}
                >
                  {item.up ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
