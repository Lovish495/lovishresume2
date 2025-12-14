import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Helmet } from "react-helmet-async";
import { Wallet, Home, Car, CreditCard } from "lucide-react";

const loanTypes = [
  { id: "home", label: "Home Loan", icon: Home, defaultRate: 8.5, maxAmount: 50000000 },
  { id: "car", label: "Car Loan", icon: Car, defaultRate: 9.5, maxAmount: 5000000 },
  { id: "personal", label: "Personal Loan", icon: CreditCard, defaultRate: 12, maxAmount: 2500000 },
];

export default function EMICalculator() {
  const [loanType, setLoanType] = useState(loanTypes[0]);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [result, setResult] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 100 / 12; // Monthly rate
    const n = tenure * 12; // Total months

    // EMI Formula: P × r × (1+r)^n / [(1+r)^n - 1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi,
      totalInterest,
      totalPayment,
    });
  };

  const handleLoanTypeChange = (type: (typeof loanTypes)[0]) => {
    setLoanType(type);
    setInterestRate(type.defaultRate);
    setLoanAmount(Math.min(loanAmount, type.maxAmount));
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

  const principalPercentage = (loanAmount / result.totalPayment) * 100 || 0;

  return (
    <>
      <Helmet>
        <title>EMI Calculator - Home, Car & Personal Loans | Lovish Singhal</title>
        <meta
          name="description"
          content="Calculate EMI for home loans, car loans, and personal loans. Plan your loan repayments with our easy-to-use EMI calculator."
        />
      </Helmet>
      <Layout>
        <section className="bg-primary py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <Wallet className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
                EMI Calculator
              </h1>
              <p className="mt-3 text-primary-foreground/80">
                Plan your loan repayments for Home, Car & Personal Loans
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              {/* Loan Type Selector */}
              <div className="mb-8 flex flex-wrap justify-center gap-4">
                {loanTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleLoanTypeChange(type)}
                    className={`flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all ${
                      loanType.id === type.id
                        ? "border-secondary bg-secondary text-secondary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                    }`}
                  >
                    <type.icon className="h-5 w-5" />
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Input Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Loan Amount */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Loan Amount</label>
                        <div className="rounded-lg border bg-background px-3 py-1">
                          <span className="font-mono font-semibold">
                            {formatCurrency(loanAmount)}
                          </span>
                        </div>
                      </div>
                      <Slider
                        value={[loanAmount]}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        min={100000}
                        max={loanType.maxAmount}
                        step={100000}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>₹1L</span>
                        <span>{formatCurrency(loanType.maxAmount)}</span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Interest Rate</label>
                        <div className="rounded-lg border bg-background px-3 py-1">
                          <span className="font-mono font-semibold">{interestRate}%</span>
                        </div>
                      </div>
                      <Slider
                        value={[interestRate]}
                        onValueChange={(value) => setInterestRate(value[0])}
                        min={5}
                        max={20}
                        step={0.1}
                        className="cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>5%</span>
                        <span>20%</span>
                      </div>
                    </div>

                    {/* Tenure */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm font-medium">Loan Tenure</label>
                        <div className="rounded-lg border bg-background px-3 py-1">
                          <span className="font-mono font-semibold">{tenure} Years</span>
                        </div>
                      </div>
                      <Slider
                        value={[tenure]}
                        onValueChange={(value) => setTenure(value[0])}
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
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your EMI Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* EMI Display */}
                    <div className="rounded-xl bg-primary p-6 text-center text-primary-foreground">
                      <span className="text-sm opacity-80">Monthly EMI</span>
                      <div className="mt-1 font-mono text-4xl font-bold">
                        {formatCurrency(result.emi)}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-muted-foreground">Principal vs Interest</span>
                        <span className="font-medium">
                          {principalPercentage.toFixed(0)}% :{" "}
                          {(100 - principalPercentage).toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full bg-destructive/20">
                        <div
                          className="h-full bg-secondary transition-all duration-500"
                          style={{ width: `${principalPercentage}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-secondary" />
                          Principal
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-destructive/50" />
                          Interest
                        </div>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3 rounded-lg bg-muted p-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Principal Amount</span>
                        <span className="font-mono font-semibold">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span className="font-mono font-semibold text-destructive">
                          {formatCurrency(result.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-semibold">Total Payment</span>
                        <span className="font-mono text-lg font-bold">
                          {formatCurrency(result.totalPayment)}
                        </span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-3 text-center">
                        <span className="text-xs text-muted-foreground">Total EMIs</span>
                        <div className="font-mono text-xl font-bold">{tenure * 12}</div>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <span className="text-xs text-muted-foreground">Interest Cost</span>
                        <div className="font-mono text-xl font-bold text-destructive">
                          {((result.totalInterest / loanAmount) * 100).toFixed(0)}%
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
