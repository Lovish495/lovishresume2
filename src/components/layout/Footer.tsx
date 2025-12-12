import { Link } from "react-router-dom";
import { Linkedin, Youtube, Instagram, Mail, Phone } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Tools", href: "/tools" },
  ],
  categories: [
    { label: "Taxation", href: "/blog?category=taxation" },
    { label: "Investing", href: "/blog?category=investing" },
    { label: "Bonds", href: "/blog?category=bonds" },
    { label: "Financial Planning", href: "/blog?category=planning" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Mail, href: "mailto:contact@lovishsinghal.in", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <span className="font-heading text-xl font-bold text-secondary-foreground">L</span>
              </div>
              <span className="font-heading text-xl font-semibold">
                Lovish Singhal
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Finance. Learning. Growth.
              <br />
              From earnings to investments — design the life you deserve.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold">Let's Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@lovishsinghal.in"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-secondary"
              >
                <Mail className="h-4 w-4" />
                contact@lovishsinghal.in
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-secondary"
              >
                <Phone className="h-4 w-4" />
                +91 99999 99999
              </a>
            </div>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-secondary hover:text-secondary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 md:flex-row">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Lovish Singhal. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
