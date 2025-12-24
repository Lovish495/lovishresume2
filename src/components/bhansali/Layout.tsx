import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StockTicker } from "./StockTicker";

interface LayoutProps {
  children: React.ReactNode;
  showTicker?: boolean;
}

export function Layout({ children, showTicker = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {showTicker && <div className="pt-20"><StockTicker /></div>}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
