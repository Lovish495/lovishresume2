import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";

// BEPL Pages
import HomePage from "./pages/bhansali/HomePage";
import AboutUs from "./pages/bhansali/AboutUs";
import HistoryMilestone from "./pages/bhansali/HistoryMilestone";
import OurDirector from "./pages/bhansali/OurDirector";
import GrowthThroughInnovation from "./pages/bhansali/GrowthThroughInnovation";
import CSRActivity from "./pages/bhansali/CSRActivity";
import Sustainability from "./pages/bhansali/Sustainability";
import Products from "./pages/bhansali/Products";
import ProductDetails from "./pages/bhansali/ProductDetails";
import ProductFinder from "./pages/bhansali/ProductFinder";
import Applications from "./pages/bhansali/Applications";
import ResearchDevelopment from "./pages/bhansali/ResearchDevelopment";
import CaseStudy from "./pages/bhansali/CaseStudy";
import FinancialResult from "./pages/bhansali/FinancialResult";
import Careers from "./pages/bhansali/Careers";
import ContactUs from "./pages/bhansali/ContactUs";
import Auth from "./pages/bhansali/Auth";
import Admin from "./pages/bhansali/Admin";
import Blog from "./pages/bhansali/Blog";
import BlogPost from "./pages/bhansali/BlogPost";
import AIInterview from "./pages/bhansali/AIInterview";
import NotFound from "./pages/NotFound";

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
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            
            {/* Auth Pages */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Blog Pages */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Company Pages */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/history-milestone" element={<HistoryMilestone />} />
            <Route path="/our-director" element={<OurDirector />} />
            <Route path="/growth-through-innovation" element={<GrowthThroughInnovation />} />
            <Route path="/csr-activity" element={<CSRActivity />} />
            <Route path="/sustainability" element={<Sustainability />} />
            
            {/* Product Pages */}
            <Route path="/products" element={<Products />} />
            <Route path="/product-details/:category" element={<ProductDetails />} />
            <Route path="/product-finder" element={<ProductFinder />} />
            <Route path="/applications" element={<Applications />} />
            
            {/* R&D Pages */}
            <Route path="/research-development" element={<ResearchDevelopment />} />
            <Route path="/research-development-projects" element={<ResearchDevelopment />} />
            <Route path="/research-development-technology" element={<ResearchDevelopment />} />
            <Route path="/case-study" element={<CaseStudy />} />
            
            {/* Investor Pages */}
            <Route path="/financial-result" element={<FinancialResult />} />
            <Route path="/stock-exchange-intimations" element={<FinancialResult />} />
            <Route path="/policies" element={<FinancialResult />} />
            <Route path="/disclosure" element={<FinancialResult />} />
            <Route path="/annual-reports" element={<FinancialResult />} />
            <Route path="/unclaimed-dividends" element={<FinancialResult />} />
            <Route path="/investorcontact" element={<ContactUs />} />
            
            {/* Other Pages */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/ai-interview" element={<AIInterview />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
