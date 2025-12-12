import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, PieChart, Wallet, TrendingUp } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Tax Calculator",
    description: "Calculate your income tax liability under old and new tax regimes.",
    href: "/tools/tax-calculator",
  },
  {
    icon: PieChart,
    title: "SIP Calculator",
    description: "Plan your mutual fund investments with our SIP returns calculator.",
    href: "/tools/sip-calculator",
  },
  {
    icon: Wallet,
    title: "EMI Calculator",
    description: "Calculate EMI for home loans, car loans, and personal loans.",
    href: "/tools/emi-calculator",
  },
  {
    icon: TrendingUp,
    title: "Compound Interest",
    description: "See how your money grows with the power of compound interest.",
    href: "/tools/compound-interest",
  },
];

export function ToolsSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-secondary">
            Free Tools
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Financial Calculators & Tools
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Make informed financial decisions with our easy-to-use calculators and planning tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <Link key={tool.title} to={tool.href}>
              <Card 
                variant="elevated" 
                className="h-full animate-fade-up opacity-0 hover:border-secondary"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <tool.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-medium text-secondary">
                    Try Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/tools">
              View All Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
