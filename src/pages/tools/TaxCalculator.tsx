import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Calculator, Info } from "lucide-react";

const taxSlabsOld = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 5 },
  { min: 500001, max: 1000000, rate: 20 },
  { min: 1000001, max: Infinity, rate: 30 },
];

const taxSlabsNew = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300001, max: 700000, rate: 5 },
  { min: 700001, max: 1000000, rate: 10 },
  { min: 1000001, max: 1200000, rate: 15 },
  { min: 1200001, max: 1500000, rate: 20 },
  { min: 1500001, max: Infinity, rate: 30 },
];

function calculateTax(income: number, slabs: typeof taxSlabsOld) {
  let tax = 0;
  let remaining = income;

  for (const slab of slabs) {
    if (remaining <= 0) break;
    const taxableInSlab = Math.min(remaining, slab.max - slab.min + 1);
    if (income > slab.min) {
      const actualTaxable = Math.min(taxableInSlab, income - slab.min);
      tax += (actualTaxable * slab.rate) / 100;
      remaining -= taxableInSlab;
    }
  }

  return tax;
}

function calculateTaxCorrect(income: number, isNew: boolean) {
  const slabs = isNew ? taxSlabsNew : taxSlabsOld;
  let tax = 0;

  for (const slab of slabs) {
    if (income > slab.min) {
      const taxableAmount = Math.min(income, slab.max) - slab.min;
      tax += (taxableAmount * slab.rate) / 100;
    }
  }

  // Add 4% cess
  const cess = tax * 0.04;
  return { tax, cess, total: tax + cess };
}

export default function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [result, setResult] = useState<{
    oldRegime: { tax: number; cess: number; total: number };
    newRegime: { tax: number; cess: number; total: number };
    recommended: string;
  } | null>(null);

  const handleCalculate = () => {
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;

    const taxableOld = Math.max(0, grossIncome - totalDeductions);
    const taxableNew = grossIncome; // New regime doesn't allow most deductions

    const oldResult = calculateTaxCorrect(taxableOld, false);
    const newResult = calculateTaxCorrect(taxableNew, true);

    setResult({
      oldRegime: oldResult,
      newRegime: newResult,
      recommended: oldResult.total <= newResult.total ? "Old Regime" : "New Regime",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Income Tax Calculator FY 2024-25 | Lovish Singhal</title>
        <meta
          name="description"
          content="Calculate your income tax under old and new tax regimes for FY 2024-25. Compare and choose the best option for tax savings."
        />
      </Helmet>
      <Layout>
        <section className="bg-primary py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <Calculator className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
                Income Tax Calculator
              </h1>
              <p className="mt-3 text-primary-foreground/80">
                FY 2024-25 (AY 2025-26) • Compare Old vs New Tax Regime
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Input Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Enter Your Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Annual Gross Income (₹)
                      </label>
                      <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Enter your annual income"
                        className="w-full rounded-lg border bg-background px-4 py-3 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Total Deductions (₹)
                        <span className="ml-1 text-xs text-muted-foreground">
                          (80C, 80D, HRA, etc.)
                        </span>
                      </label>
                      <input
                        type="number"
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                        placeholder="Enter total deductions"
                        className="w-full rounded-lg border bg-background px-4 py-3 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      />
                    </div>

                    <Button onClick={handleCalculate} className="w-full" size="lg">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Tax
                    </Button>

                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex items-start gap-2">
                        <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Deductions are applicable only under Old Regime. New Regime offers
                          lower tax rates but limited deductions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result ? (
                      <div className="space-y-6">
                        {/* Old Regime */}
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-3 font-semibold text-foreground">Old Regime</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tax</span>
                              <span className="font-mono">
                                {formatCurrency(result.oldRegime.tax)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cess (4%)</span>
                              <span className="font-mono">
                                {formatCurrency(result.oldRegime.cess)}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-semibold">
                              <span>Total Tax</span>
                              <span className="font-mono text-lg">
                                {formatCurrency(result.oldRegime.total)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* New Regime */}
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-3 font-semibold text-foreground">New Regime</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tax</span>
                              <span className="font-mono">
                                {formatCurrency(result.newRegime.tax)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cess (4%)</span>
                              <span className="font-mono">
                                {formatCurrency(result.newRegime.cess)}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-semibold">
                              <span>Total Tax</span>
                              <span className="font-mono text-lg">
                                {formatCurrency(result.newRegime.total)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Recommendation */}
                        <div className="rounded-lg bg-secondary/10 p-4">
                          <div className="text-center">
                            <span className="text-sm text-muted-foreground">
                              Recommended Regime
                            </span>
                            <div className="mt-1 text-xl font-bold text-secondary">
                              {result.recommended}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              You save{" "}
                              <span className="font-semibold text-secondary">
                                {formatCurrency(
                                  Math.abs(result.oldRegime.total - result.newRegime.total)
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center text-muted-foreground">
                        Enter your income details to see the tax comparison
                      </div>
                    )}
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
