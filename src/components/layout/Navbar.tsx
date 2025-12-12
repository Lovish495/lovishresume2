import { useState } from "react";
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
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-lg font-bold text-primary-foreground">L</span>
          </div>
          <span className="font-heading text-xl font-semibold text-foreground">
            Lovish Singhal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
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
                  "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-4 w-4" />}
              </Link>

              {/* Dropdown */}
              {item.children && activeDropdown === item.label && (
                <div className="absolute left-0 top-full min-w-48 animate-fade-in rounded-lg border bg-card p-2 shadow-card">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button variant="hero" size="sm" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button variant="hero" className="mt-4" asChild>
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
