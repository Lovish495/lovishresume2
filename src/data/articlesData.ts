export interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

export const allArticles: Article[] = [
  {
    id: 1,
    title: "Understanding TDS: A Complete Guide for Beginners",
    description: "Learn about Tax Deducted at Source, its implications, and how to handle TDS in your financial planning.",
    category: "Taxation",
    readTime: "8 min read",
    author: "Lovish Singhal",
    date: "Dec 10, 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
    content: `
## What is TDS?

Tax Deducted at Source (TDS) is a means of collecting income tax in India. Under this system, tax is deducted at the point of generation of income itself. The payer of income deducts a certain percentage of tax before making payment to the receiver.

## Why TDS Exists

The primary objective of TDS is to collect tax at the very source of income. This ensures that the government receives a steady flow of revenue throughout the year, rather than waiting for taxpayers to file their returns.

### Key Benefits of TDS:
- **Regular revenue collection** for the government
- **Reduced tax evasion** as tax is deducted at source
- **Simplified compliance** for taxpayers
- **Documentation trail** for income tracking

## TDS Rates for Different Income Types

| Income Type | TDS Rate |
|-------------|----------|
| Salary | Based on slab rates |
| Interest on Securities | 10% |
| Dividends | 10% |
| Professional Fees | 10% |
| Rent (Property) | 10% |
| Commission | 5% |

## When is TDS Deducted?

TDS is deducted when a payment is due or when actual payment is made, whichever is earlier. This applies to:

1. **Salaries** - Monthly deduction based on estimated annual income
2. **Interest payments** - On fixed deposits, securities
3. **Professional fees** - Payments to consultants, contractors
4. **Rent payments** - Above specified threshold

## How to Claim TDS Credit

To claim credit for TDS deducted:

1. Ensure the deductor has filed TDS returns
2. Check Form 26AS for TDS credit
3. Match TDS entries with your income
4. Claim credit while filing ITR

## Important Points to Remember

- Always verify TDS credits in Form 26AS
- Keep track of TDS certificates (Form 16/16A)
- File returns even if total tax is deducted
- Claim refund if TDS exceeds actual tax liability

## Conclusion

Understanding TDS is crucial for every taxpayer in India. It not only helps in tax planning but also ensures you claim the right credits while filing your returns. Keep all TDS certificates safe and always cross-verify with Form 26AS before filing your income tax return.
    `
  },
  {
    id: 2,
    title: "Bonds vs Fixed Deposits: Which is Right for You?",
    description: "A comprehensive comparison of bonds and fixed deposits to help you make informed investment decisions.",
    category: "Bonds",
    readTime: "6 min read",
    author: "Lovish Singhal",
    date: "Dec 8, 2025",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
    content: `
## Introduction

When it comes to fixed-income investments, bonds and fixed deposits (FDs) are two popular options. Both offer relatively stable returns, but they differ significantly in terms of risk, liquidity, and returns.

## What are Fixed Deposits?

Fixed Deposits are savings instruments offered by banks where you deposit a lump sum for a fixed tenure at a predetermined interest rate.

### Advantages of FDs:
- **Capital safety** - Deposits up to ₹5 lakh insured by DICGC
- **Guaranteed returns** - Interest rate fixed at deposit time
- **Easy to understand** - Simple investment mechanism
- **Flexible tenure** - From 7 days to 10 years

## What are Bonds?

Bonds are debt securities where an investor loans money to a borrower (government or corporate) for a defined period at a fixed or variable interest rate.

### Types of Bonds:
1. **Government Securities (G-Secs)**
2. **Corporate Bonds**
3. **Tax-Free Bonds**
4. **Sovereign Gold Bonds**

## Comparison Table

| Feature | Fixed Deposits | Bonds |
|---------|---------------|-------|
| Returns | 5-7% | 7-12% |
| Risk | Very Low | Low to Medium |
| Liquidity | Moderate | High (if listed) |
| Taxation | Fully taxable | Varies |
| Minimum Investment | ₹1,000 | ₹10,000 |

## When to Choose FDs

- Need guaranteed, safe returns
- Short-term parking of funds
- Senior citizens seeking regular income
- Building emergency fund

## When to Choose Bonds

- Seeking higher returns
- Long-term investment horizon
- Want tax benefits (tax-free bonds)
- Portfolio diversification

## Conclusion

Both FDs and bonds have their place in a well-diversified portfolio. FDs offer safety and simplicity, while bonds can provide higher returns with manageable risk. Consider your financial goals, risk appetite, and investment horizon before choosing.
    `
  },
  {
    id: 3,
    title: "Building Your Emergency Fund: Step by Step",
    description: "Essential strategies to build a financial safety net that can sustain you during unexpected situations.",
    category: "Investing",
    readTime: "5 min read",
    author: "Lovish Singhal",
    date: "Dec 5, 2025",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
    content: `
## Why You Need an Emergency Fund

Life is unpredictable. Job loss, medical emergencies, or unexpected repairs can derail your finances. An emergency fund acts as a financial buffer that keeps you afloat during tough times.

## How Much Should You Save?

A good rule of thumb is to save **3-6 months of essential expenses**. This includes:

- Rent/EMI
- Utilities
- Food
- Insurance premiums
- Minimum debt payments

### Calculation Example:

If your monthly essentials cost ₹50,000, aim for an emergency fund of ₹1.5-3 lakhs.

## Step-by-Step Guide to Building Your Fund

### Step 1: Calculate Your Target
List all essential monthly expenses and multiply by 6 for a comfortable cushion.

### Step 2: Start Small
Don't be overwhelmed. Start with a goal of ₹10,000 and build from there.

### Step 3: Automate Savings
Set up automatic transfers to a separate savings account on payday.

### Step 4: Cut Unnecessary Expenses
Review subscriptions, dining out, and impulse purchases. Redirect savings to your fund.

### Step 5: Use Windfalls Wisely
Bonuses, tax refunds, or gifts can accelerate your fund building.

## Where to Keep Your Emergency Fund

Choose options that offer:
- **High liquidity** - Instant access when needed
- **Safety** - No market risk
- **Reasonable returns** - Beat inflation

### Best Options:
1. High-yield savings account
2. Liquid mutual funds
3. Short-term FDs with sweep facility

## Common Mistakes to Avoid

- Using emergency fund for non-emergencies
- Keeping too much in savings (opportunity cost)
- Not replenishing after use
- Investing in volatile instruments

## Conclusion

An emergency fund isn't just about money—it's about peace of mind. Start building yours today, even if it's just ₹500 a week. Consistency is key!
    `
  },
  {
    id: 4,
    title: "GST Filing: A Simple Guide for Small Businesses",
    description: "Everything you need to know about filing GST returns as a small business owner in India.",
    category: "Taxation",
    readTime: "10 min read",
    author: "Lovish Singhal",
    date: "Dec 3, 2025",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60",
    content: `
## Understanding GST for Small Businesses

Goods and Services Tax (GST) replaced multiple indirect taxes in India, creating a unified tax structure. For small businesses, understanding GST compliance is crucial.

## GST Registration Threshold

| Business Type | Threshold Limit |
|--------------|-----------------|
| Goods (General States) | ₹40 lakhs |
| Goods (Special States) | ₹20 lakhs |
| Services | ₹20 lakhs |
| Interstate Supply | Mandatory |

## Types of GST Returns

### GSTR-1: Outward Supplies
- **Due Date**: 11th of next month
- **Content**: Details of all sales

### GSTR-3B: Summary Return
- **Due Date**: 20th of next month
- **Content**: Summary of sales, purchases, tax liability

### GSTR-9: Annual Return
- **Due Date**: 31st December
- **Content**: Yearly summary

## Step-by-Step Filing Process

### Step 1: Collect Documents
- Sales invoices
- Purchase invoices
- Credit/debit notes
- Bank statements

### Step 2: Login to GST Portal
Visit www.gst.gov.in and login with your credentials.

### Step 3: Prepare GSTR-1
Upload all outward supply details with HSN codes.

### Step 4: File GSTR-3B
- Report total sales and purchases
- Calculate net tax liability
- Pay tax if applicable

### Step 5: Reconcile
Match your records with auto-populated data from suppliers.

## Input Tax Credit (ITC)

ITC allows you to reduce your tax liability by claiming credit for tax paid on purchases.

### Conditions for ITC:
- Valid tax invoice
- Goods/services received
- Supplier has filed returns
- Tax has been paid by supplier

## Common GST Mistakes to Avoid

1. **Late filing** - Attracts late fees and interest
2. **Incorrect HSN codes** - May lead to ITC denial
3. **Mismatched invoices** - Causes reconciliation issues
4. **Not claiming ITC** - Unnecessary tax burden

## Penalties for Non-Compliance

| Violation | Penalty |
|-----------|---------|
| Late filing | ₹50/day (Max ₹5,000) |
| Non-registration | 100% of tax due |
| Fraud | 100% of tax + imprisonment |

## Conclusion

GST compliance may seem complex, but with proper record-keeping and timely filing, small businesses can easily manage their obligations. Consider using GST software or hiring a professional if you find it overwhelming.
    `
  },
  {
    id: 5,
    title: "Introduction to Government Securities",
    description: "Discover the world of G-Secs and how they can be a safe investment option for your portfolio.",
    category: "Bonds",
    readTime: "7 min read",
    author: "Lovish Singhal",
    date: "Nov 28, 2025",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60",
    content: `
## What are Government Securities?

Government Securities (G-Secs) are debt instruments issued by the Government of India to finance its fiscal deficit. These are considered the safest investments as they carry sovereign guarantee.

## Types of G-Secs

### Treasury Bills (T-Bills)
- Short-term instruments (91, 182, 364 days)
- Issued at discount, redeemed at face value
- Zero coupon instruments

### Government Bonds
- Long-term instruments (5-40 years)
- Pay periodic interest (coupon)
- Redeemable at face value on maturity

### State Development Loans (SDLs)
- Issued by state governments
- Slightly higher yields than central G-Secs
- Similar structure to government bonds

## Why Invest in G-Secs?

### Advantages:
1. **Sovereign guarantee** - Zero default risk
2. **Regular income** - Semi-annual interest payments
3. **Liquidity** - Actively traded in secondary market
4. **Portfolio diversification** - Low correlation with equity
5. **No TDS** - No tax deduction at source

## How to Invest in G-Secs

### RBI Retail Direct
- Open free gilt account with RBI
- Participate in primary auctions
- Buy/sell in secondary market

### Mutual Funds
- Gilt funds for long-term G-Secs
- Liquid funds for T-Bills
- Professional management

### Stock Exchanges
- NSE goBID platform
- BSE Direct
- Through demat account

## Understanding G-Sec Pricing

G-Sec prices move inversely to interest rates:

| Interest Rate Movement | G-Sec Price |
|-----------------------|-------------|
| Rates Increase | Price Falls |
| Rates Decrease | Price Rises |

## Risks in G-Secs

While default risk is zero, consider:

- **Interest rate risk** - Price volatility
- **Reinvestment risk** - Lower rates on maturity
- **Inflation risk** - Real returns may be low
- **Liquidity risk** - Some securities less liquid

## Current G-Sec Yields (Indicative)

| Tenure | Yield |
|--------|-------|
| 1 Year | ~7.0% |
| 5 Years | ~7.2% |
| 10 Years | ~7.3% |
| 30 Years | ~7.5% |

## Conclusion

Government Securities offer a safe haven for conservative investors. With RBI Retail Direct making G-Secs accessible to retail investors, there's never been a better time to add them to your portfolio.
    `
  },
  {
    id: 6,
    title: "Understanding Mutual Funds: A Beginner's Guide",
    description: "Learn the basics of mutual funds and how to start your investment journey with SIPs.",
    category: "Investing",
    readTime: "9 min read",
    author: "Lovish Singhal",
    date: "Nov 25, 2025",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
    content: `
## What are Mutual Funds?

A mutual fund is a professionally managed investment vehicle that pools money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities.

## Types of Mutual Funds

### By Asset Class:
- **Equity Funds** - Invest in stocks
- **Debt Funds** - Invest in bonds and money market
- **Hybrid Funds** - Mix of equity and debt
- **Index Funds** - Track market indices

### By Investment Style:
- **Large Cap** - Top 100 companies
- **Mid Cap** - Companies ranked 101-250
- **Small Cap** - Companies ranked 251+
- **Multi Cap** - Across market caps

## Why Choose Mutual Funds?

1. **Professional Management** - Expert fund managers
2. **Diversification** - Spread risk across securities
3. **Affordability** - Start with just ₹500
4. **Liquidity** - Easy redemption
5. **Transparency** - Regular disclosures
6. **Tax Benefits** - ELSS for 80C deduction

## Understanding SIP (Systematic Investment Plan)

SIP allows you to invest a fixed amount regularly in mutual funds.

### Benefits of SIP:
- **Rupee cost averaging** - Buy more units when prices are low
- **Disciplined investing** - Automated investments
- **Power of compounding** - Long-term wealth creation
- **Flexibility** - Increase, decrease, or pause anytime

### SIP Calculator Example:
| Monthly SIP | Years | Expected Returns | Corpus |
|-------------|-------|------------------|--------|
| ₹5,000 | 10 | 12% | ₹11.6 lakhs |
| ₹10,000 | 15 | 12% | ₹50.5 lakhs |
| ₹15,000 | 20 | 12% | ₹1.5 crores |

## How to Choose the Right Fund

### Consider These Factors:
1. **Investment goal** - Growth, income, or both
2. **Time horizon** - Short, medium, or long term
3. **Risk appetite** - Conservative to aggressive
4. **Fund performance** - Compare with benchmark
5. **Expense ratio** - Lower is better

## Key Metrics to Evaluate

- **NAV** - Net Asset Value per unit
- **AUM** - Assets Under Management
- **CAGR** - Compounded Annual Growth Rate
- **Alpha** - Returns above benchmark
- **Beta** - Volatility compared to market
- **Sharpe Ratio** - Risk-adjusted returns

## Common Mistakes to Avoid

1. Chasing past returns
2. Not diversifying across fund types
3. Stopping SIPs during market falls
4. Ignoring expense ratios
5. Over-monitoring short-term performance

## Taxation of Mutual Funds

| Fund Type | Holding Period | Tax Rate |
|-----------|---------------|----------|
| Equity | < 1 year | 15% STCG |
| Equity | > 1 year | 10% LTCG (above ₹1 lakh) |
| Debt | < 3 years | As per slab |
| Debt | > 3 years | 20% with indexation |

## Getting Started

1. Complete KYC (PAN, Aadhaar, address proof)
2. Choose direct or regular plan
3. Select funds based on goals
4. Start SIP or lump sum investment
5. Review portfolio periodically

## Conclusion

Mutual funds are an excellent way to start your investment journey. With professional management, diversification, and flexibility, they cater to investors of all types. Start with a small SIP today and let the power of compounding work for you!
    `
  },
];

export const categoryColors: Record<string, string> = {
  Taxation: "bg-amber-100 text-amber-800",
  Bonds: "bg-blue-100 text-blue-800",
  Investing: "bg-emerald-100 text-emerald-800",
};

export const categories = ["All", "Taxation", "Bonds", "Investing"];
