import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Helmet } from "react-helmet-async";
import { PieChart, TrendingUp, IndianRupee } from "lucide-react";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [result, setResult] = useState({
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
  });

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const calculateSIP = () => {
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12; // Monthly rate
    const n = timePeriod * 12; // Total months

    // SIP Future Value Formula: P × [(1+r)^n - 1] / r × (1+r)
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const investedAmount = P * n;
    const estimatedReturns = futureValue - investedAmount;

    setResult({
      investedAmount,
      estimatedReturns,
      totalValue: futureValue,
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

  const investedPercentage = (result.investedAmount / result.totalValue) * 100 || 0;

  return (
    <>
      <Helmet>
        <title>SIP Calculator - Calculate Mutual Fund Returns | Lovish Singhal</title>
        <meta
          name="description"
          content="Calculate your SIP returns and plan your mutual fund investments. See how your money grows with systematic investment plans."
        />
      </Helmet>
      <Layout>
        <section className="bg-primary py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <PieChart className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
                SIP Calculator
              </h1>
              <p className="mt-3 text-primary-foreground/80">
                Plan your wealth creation with Systematic Investment Plans
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Input Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Monthly Investment */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Monthly Investment</label>
                        <div className="flex items-center rounded-lg border bg-background px-3 py-1">
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                          <input
                            type="number"
                            value={monthlyInvestment}
                            onChange={(e) =>
                              setMonthlyInvestment(Math.max(500, parseInt(e.target.value) || 500))
                            }
                            className="w-24 bg-transparent text-right font-mono font-semibold focus:outline-none"
                          />
                        </div>
                      </div>
                      <Slider
                        value={[monthlyInvestment]}
                        onValueChange={(value) => setMonthlyInvestment(value[0])}
                        min={500}
                        max={200000}
                        step={500}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>₹500</span>
                        <span>₹2L</span>
                      </div>
                    </div>

                    {/* Expected Return */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Expected Return (p.a.)</label>
                        <div className="flex items-center rounded-lg border bg-background px-3 py-1">
                          <input
                            type="number"
                            value={expectedReturn}
                            onChange={(e) =>
                              setExpectedReturn(
                                Math.min(30, Math.max(1, parseFloat(e.target.value) || 1))
                              )
                            }
                            className="w-16 bg-transparent text-right font-mono font-semibold focus:outline-none"
                          />
                          <span className="ml-1 text-muted-foreground">%</span>
                        </div>
                      </div>
                      <Slider
                        value={[expectedReturn]}
                        onValueChange={(value) => setExpectedReturn(value[0])}
                        min={1}
                        max={30}
                        step={0.5}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>1%</span>
                        <span>30%</span>
                      </div>
                    </div>

                    {/* Time Period */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Time Period</label>
                        <div className="flex items-center rounded-lg border bg-background px-3 py-1">
                          <input
                            type="number"
                            value={timePeriod}
                            onChange={(e) =>
                              setTimePeriod(
                                Math.min(40, Math.max(1, parseInt(e.target.value) || 1))
                              )
                            }
                            className="w-12 bg-transparent text-right font-mono font-semibold focus:outline-none"
                          />
                          <span className="ml-1 text-muted-foreground">Yrs</span>
                        </div>
                      </div>
                      <Slider
                        value={[timePeriod]}
                        onValueChange={(value) => setTimePeriod(value[0])}
                        min={1}
                        max={40}
                        step={1}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>1 Yr</span>
                        <span>40 Yrs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Investment Growth</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Visual Chart */}
                    <div className="relative mx-auto h-48 w-48">
                      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="12"
                          className="text-secondary/20"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="12"
                          strokeDasharray={`${investedPercentage * 2.51} 251`}
                          className="text-primary transition-all duration-500"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="12"
                          strokeDasharray={`${(100 - investedPercentage) * 2.51} 251`}
                          strokeDashoffset={`${-investedPercentage * 2.51}`}
                          className="text-secondary transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs text-muted-foreground">Total Value</span>
                        <span className="font-mono text-xl font-bold text-foreground">
                          {formatCurrency(result.totalValue)}
                        </span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">Invested</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-secondary" />
                        <span className="text-xs text-muted-foreground">Returns</span>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3 rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Invested Amount</span>
                        <span className="font-mono font-semibold">
                          {formatCurrency(result.investedAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Est. Returns</span>
                        <span className="font-mono font-semibold text-secondary">
                          +{formatCurrency(result.estimatedReturns)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-semibold">Total Value</span>
                        <span className="font-mono text-lg font-bold">
                          {formatCurrency(result.totalValue)}
                        </span>
                      </div>
                    </div>

                    {/* Insight */}
                    <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="mt-0.5 h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Wealth Multiplier:{" "}
                            <span className="text-secondary">
                              {(result.totalValue / result.investedAmount || 0).toFixed(2)}x
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Your money could grow{" "}
                            {(result.totalValue / result.investedAmount || 0).toFixed(2)} times in{" "}
                            {timePeriod} years through the power of compounding.
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
