import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, PieChart, Wallet, TrendingUp, Sparkles } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Tax Calculator",
    description: "Calculate your income tax liability under old and new tax regimes.",
    href: "/tools/tax-calculator",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: PieChart,
    title: "SIP Calculator",
    description: "Plan your mutual fund investments with our SIP returns calculator.",
    href: "/tools/sip-calculator",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Wallet,
    title: "EMI Calculator",
    description: "Calculate EMI for home loans, car loans, and personal loans.",
    href: "/tools/emi-calculator",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent-foreground",
  },
  {
    icon: TrendingUp,
    title: "Compound Interest",
    description: "See how your money grows with the power of compound interest.",
    href: "/tools/compound-interest-calculator",
    color: "from-destructive/20 to-destructive/5",
    iconColor: "text-destructive",
  },
];

export function ToolsSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container px-4">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">Free Tools</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Financial Calculators & Tools
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Make informed financial decisions with our easy-to-use calculators and planning tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {tools.map((tool, index) => (
            <Link key={tool.title} to={tool.href} className="group">
              <Card 
                className="h-full border-border/50 bg-card transition-all duration-300 hover:-translate-y-2 hover:border-secondary/50 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className={`mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color}`}>
                    <tool.icon className={`h-7 w-7 ${tool.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg text-foreground">{tool.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-semibold text-secondary transition-colors group-hover:text-primary">
                    Try Now
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
