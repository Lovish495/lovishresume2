import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "All Articles", href: "/blog" },
      { label: "Taxation", href: "/blog?category=taxation" },
      { label: "Investing", href: "/blog?category=investing" },
      { label: "Bonds", href: "/blog?category=bonds" },
    ],
  },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
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

  const isActive = (href: string) => location.pathname === href;

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "border-b border-border/50 bg-background/95 shadow-lg backdrop-blur-xl" 
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:h-18 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl font-bold text-lg transition-all duration-300",
            scrolled 
              ? "bg-primary text-primary-foreground" 
              : "bg-white/20 text-white backdrop-blur-sm"
          )}>
            L
          </div>
          <span className={cn(
            "text-lg font-bold transition-colors duration-300 sm:text-xl",
            scrolled ? "text-foreground" : "text-white"
          )}>
            Lovish Singhal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  scrolled
                    ? isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    : isActive(item.href)
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-4 w-4" />}
              </Link>

              {/* Dropdown */}
              {item.children && activeDropdown === item.label && (
                <div className="absolute left-0 top-full min-w-[200px] animate-fade-in rounded-xl border border-border bg-card p-2 shadow-xl">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden lg:block">
          <Button 
            variant={scrolled ? "default" : "heroOutline"} 
            size="sm" 
            asChild
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "lg:hidden",
            !scrolled && "text-white hover:bg-white/10"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background p-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-border pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button variant="default" className="mt-4" asChild>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
