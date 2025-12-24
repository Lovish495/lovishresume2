import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Company",
    items: [
      { label: "About Us", href: "/about-us" },
      { label: "History & Milestones", href: "/history-milestone" },
      { label: "Board of Directors", href: "/our-director" },
      { label: "Growth Through Innovation", href: "/growth-through-innovation" },
      { label: "CSR Activity", href: "/csr-activity" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    label: "Products",
    items: [
      { label: "All Products", href: "/products" },
      { label: "ABS", href: "/product-details/ABS" },
      { label: "ASA", href: "/product-details/ASA" },
      { label: "PC-ABS", href: "/product-details/PC-ABS" },
      { label: "Specialities", href: "/product-details/Specialities" },
      { label: "Product Finder", href: "/product-finder" },
      { label: "Applications", href: "/applications" },
    ],
  },
  {
    label: "R&D",
    items: [
      { label: "Research & Development", href: "/research-development" },
      { label: "R&D Projects", href: "/research-development-projects" },
      { label: "R&D Technology", href: "/research-development-technology" },
      { label: "Case Studies", href: "/case-study" },
    ],
  },
  {
    label: "Investors",
    items: [
      { label: "Financial Results", href: "/financial-result" },
      { label: "Stock Exchange Intimations", href: "/stock-exchange-intimations" },
      { label: "Policies", href: "/policies" },
      { label: "Disclosures", href: "/disclosure" },
      { label: "Annual Reports", href: "/annual-reports" },
      { label: "Unclaimed Dividends", href: "/unclaimed-dividends" },
      { label: "Investor Contact", href: "/investorcontact" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact-us" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-xl text-primary-foreground shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
                B
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg text-foreground">BEPL</span>
              <span className="block text-xs text-muted-foreground">Bhansali Engineering Polymers</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.items && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.items ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      activeDropdown === item.label
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      activeDropdown === item.label && "rotate-180"
                    )} />
                  </button>
                ) : (
                  <Link
                    to={item.href!}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      isActive(item.href!)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.items && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="glass rounded-xl p-2 min-w-[220px] shadow-xl border border-border/50">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm rounded-lg transition-all duration-200",
                            isActive(subItem.href)
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact-us">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold px-6 shadow-glow-sm hover:shadow-glow transition-all duration-300">
                <Phone className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.items ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted/50"
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform",
                          activeDropdown === item.label && "rotate-180"
                        )} />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pl-4 space-y-1 mt-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href!}
                      className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted/50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 px-4">
                <Link to="/contact-us" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                    <Phone className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
