import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calculator, PieChart, Wallet, TrendingUp, Percent, IndianRupee, BarChart3, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";

const tools = [
  {
    icon: Calculator,
    title: "Income Tax Calculator",
    description: "Calculate your income tax liability under old and new tax regimes. Understand your tax savings options.",
    href: "/tools/tax-calculator",
    category: "Taxation",
  },
  {
    icon: PieChart,
    title: "SIP Calculator",
    description: "Plan your mutual fund investments. See how your money grows with systematic investment plans.",
    href: "/tools/sip-calculator",
    category: "Investing",
  },
  {
    icon: Wallet,
    title: "EMI Calculator",
    description: "Calculate EMI for home loans, car loans, and personal loans. Plan your repayments effectively.",
    href: "/tools/emi-calculator",
    category: "Loans",
  },
  {
    icon: TrendingUp,
    title: "Compound Interest Calculator",
    description: "See the magic of compounding. Calculate how your investments grow over time.",
    href: "/tools/compound-interest-calculator",
    category: "Investing",
  },
  {
    icon: Percent,
    title: "FD Interest Calculator",
    description: "Calculate fixed deposit returns. Compare rates across different tenures and banks.",
    href: "/tools/fd-calculator",
    category: "Savings",
  },
  {
    icon: IndianRupee,
    title: "PPF Calculator",
    description: "Calculate your Public Provident Fund returns with annual contributions and interest.",
    href: "/tools/ppf-calculator",
    category: "Savings",
  },
  {
    icon: BarChart3,
    title: "NPS Calculator",
    description: "Plan your retirement with National Pension System. Calculate your corpus at retirement.",
    href: "/tools/nps-calculator",
    category: "Retirement",
  },
  {
    icon: FileText,
    title: "HRA Calculator",
    description: "Calculate your HRA exemption. Know how much of your rent is tax-deductible.",
    href: "/tools/hra-calculator",
    category: "Taxation",
  },
];

const categoryColors: Record<string, string> = {
  Taxation: "bg-amber-100 text-amber-800",
  Investing: "bg-emerald-100 text-emerald-800",
  Loans: "bg-blue-100 text-blue-800",
  Savings: "bg-purple-100 text-purple-800",
  Retirement: "bg-rose-100 text-rose-800",
};

const Tools = () => {
  return (
    <>
      <Helmet>
        <title>Financial Tools & Calculators | Lovish Singhal</title>
        <meta
          name="description"
          content="Free financial calculators including income tax, SIP, EMI, compound interest, FD, PPF, NPS, and HRA calculators. Plan your finances better."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container text-center">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              Financial Tools
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Free calculators and tools to help you make smarter financial decisions.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool, index) => (
                <Link key={tool.title} to={tool.href}>
                  <Card 
                    variant="elevated"
                    className="h-full animate-fade-up cursor-pointer opacity-0 transition-all hover:border-secondary"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                  >
                    <CardHeader>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                          <tool.icon className="h-6 w-6 text-secondary" />
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[tool.category]}`}>
                          {tool.category}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm font-medium text-secondary">
                        Calculate Now →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="bg-background py-12">
          <div className="container text-center">
            <p className="text-muted-foreground">
              More tools coming soon! Have a suggestion?{" "}
              <Link to="/contact" className="font-medium text-secondary hover:underline">
                Let me know
              </Link>
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Tools;
