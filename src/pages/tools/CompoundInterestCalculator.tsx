import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Helmet } from "react-helmet-async";
import { TrendingUp, Zap } from "lucide-react";

const compoundingFrequencies = [
  { id: "yearly", label: "Yearly", value: 1 },
  { id: "half-yearly", label: "Half-Yearly", value: 2 },
  { id: "quarterly", label: "Quarterly", value: 4 },
  { id: "monthly", label: "Monthly", value: 12 },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(10);
  const [frequency, setFrequency] = useState(compoundingFrequencies[0]);
  const [result, setResult] = useState({
    maturityAmount: 0,
    totalInterest: 0,
    simpleInterest: 0,
    compoundingBenefit: 0,
  });

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, frequency]);

  const calculateCompoundInterest = () => {
    const P = principal;
    const r = rate / 100;
    const t = time;
    const n = frequency.value;

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const totalInterest = maturityAmount - P;

    // Simple Interest for comparison: SI = P × r × t
    const simpleInterest = P * r * t;
    const compoundingBenefit = totalInterest - simpleInterest;

    setResult({
      maturityAmount,
      totalInterest,
      simpleInterest,
      compoundingBenefit,
    });
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Generate year-by-year growth for visualization
  const growthData = Array.from({ length: time + 1 }, (_, i) => {
    const amount = principal * Math.pow(1 + rate / 100 / frequency.value, frequency.value * i);
    return { year: i, amount };
  });

  const maxAmount = growthData[growthData.length - 1]?.amount || principal;

  return (
    <>
      <Helmet>
        <title>Compound Interest Calculator | Lovish Singhal</title>
        <meta
          name="description"
          content="See the power of compounding. Calculate how your investments grow over time with compound interest."
        />
      </Helmet>
      <Layout>
        <section className="bg-primary py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <TrendingUp className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
                Compound Interest Calculator
              </h1>
              <p className="mt-3 text-primary-foreground/80">
                Discover the 8th wonder of the world — Compound Interest
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Input Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Principal */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Principal Amount</label>
                        <div className="rounded-lg border bg-background px-3 py-1">
                          <span className="font-mono font-semibold">
                            {formatCurrency(principal)}
                          </span>
                        </div>
                      </div>
                      <Slider
                        value={[principal]}
                        onValueChange={(value) => setPrincipal(value[0])}
                        min={10000}
                        max={10000000}
                        step={10000}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>₹10K</span>
                        <span>₹1Cr</span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Interest Rate (p.a.)</label>
                        <div className="rounded-lg border bg-background px-3 py-1">
                          <span className="font-mono font-semibold">{rate}%</span>
                        </div>
                      </div>
                      <Slider
                        value={[rate]}
                        onValueChange={(value) => setRate(value[0])}
                        min={1}
                        max={25}
                        step={0.5}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>1%</span>
                        <span>25%</span>
                      </div>
                    </div>

                    {/* Time Period */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Time Period</label>
                        <div className="rounded-lg border bg-background px-3 py-1">
                          <span className="font-mono font-semibold">{time} Years</span>
                        </div>
                      </div>
                      <Slider
                        value={[time]}
                        onValueChange={(value) => setTime(value[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>1 Year</span>
                        <span>30 Years</span>
                      </div>
                    </div>

                    {/* Compounding Frequency */}
                    <div>
                      <label className="mb-3 block text-sm font-medium">
                        Compounding Frequency
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {compoundingFrequencies.map((freq) => (
                          <button
                            key={freq.id}
                            onClick={() => setFrequency(freq)}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                              frequency.id === freq.id
                                ? "border-secondary bg-secondary text-secondary-foreground"
                                : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                            }`}
                          >
                            {freq.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Maturity Amount */}
                    <div className="rounded-xl bg-gradient-accent p-6 text-center text-secondary-foreground">
                      <span className="text-sm opacity-80">Maturity Amount</span>
                      <div className="mt-1 font-mono text-4xl font-bold">
                        {formatCurrency(result.maturityAmount)}
                      </div>
                      <span className="text-sm opacity-80">
                        after {time} years
                      </span>
                    </div>

                    {/* Growth Chart */}
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-4 text-sm font-medium">Year-by-Year Growth</h4>
                      <div className="flex h-32 items-end gap-1">
                        {growthData.map((data, index) => (
                          <div
                            key={data.year}
                            className="group relative flex-1"
                            style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                          >
                            <div className="h-full w-full rounded-t bg-secondary/80 transition-colors hover:bg-secondary" />
                            <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                              {formatCurrency(data.amount)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>Year 0</span>
                        <span>Year {time}</span>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3 rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Principal</span>
                        <span className="font-mono font-semibold">
                          {formatCurrency(principal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest Earned</span>
                        <span className="font-mono font-semibold text-secondary">
                          +{formatCurrency(result.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-semibold">Maturity Amount</span>
                        <span className="font-mono text-lg font-bold">
                          {formatCurrency(result.maturityAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Compounding Benefit */}
                    <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-4">
                      <div className="flex items-start gap-3">
                        <Zap className="mt-0.5 h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Power of Compounding
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            You earn{" "}
                            <span className="font-semibold text-secondary">
                              {formatCurrency(result.compoundingBenefit)}
                            </span>{" "}
                            extra compared to simple interest. Your money grows{" "}
                            <span className="font-semibold">
                              {(result.maturityAmount / principal).toFixed(2)}x
                            </span>{" "}
                            in {time} years!
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
