import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TaxCalculator from "./pages/tools/TaxCalculator";
import SIPCalculator from "./pages/tools/SIPCalculator";
import EMICalculator from "./pages/tools/EMICalculator";
import CompoundInterestCalculator from "./pages/tools/CompoundInterestCalculator";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/tax-calculator" element={<TaxCalculator />} />
            <Route path="/tools/sip-calculator" element={<SIPCalculator />} />
            <Route path="/tools/emi-calculator" element={<EMICalculator />} />
            <Route path="/tools/compound-interest-calculator" element={<CompoundInterestCalculator />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
