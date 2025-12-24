export interface FinancialDocument {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  fileType: "pdf" | "xlsx";
  category: string;
}

export const financialResults: FinancialDocument[] = [
  {
    id: "fr-q2-2025",
    title: "Financial Results - Q2 FY 2024-25",
    date: "2024-11-14",
    fileUrl: "/documents/financial/q2-fy25.pdf",
    fileType: "pdf",
    category: "Quarterly Results",
  },
  {
    id: "fr-q1-2025",
    title: "Financial Results - Q1 FY 2024-25",
    date: "2024-08-12",
    fileUrl: "/documents/financial/q1-fy25.pdf",
    fileType: "pdf",
    category: "Quarterly Results",
  },
  {
    id: "fr-q4-2024",
    title: "Financial Results - Q4 FY 2023-24",
    date: "2024-05-28",
    fileUrl: "/documents/financial/q4-fy24.pdf",
    fileType: "pdf",
    category: "Quarterly Results",
  },
  {
    id: "fr-annual-2024",
    title: "Annual Financial Results - FY 2023-24",
    date: "2024-05-28",
    fileUrl: "/documents/financial/annual-fy24.pdf",
    fileType: "pdf",
    category: "Annual Results",
  },
];

export const stockExchangeIntimations: FinancialDocument[] = [
  {
    id: "sei-001",
    title: "Board Meeting Outcome - Q2 Results",
    date: "2024-11-14",
    fileUrl: "/documents/intimations/bm-q2-2025.pdf",
    fileType: "pdf",
    category: "Board Meeting",
  },
  {
    id: "sei-002",
    title: "Prior Intimation - Board Meeting",
    date: "2024-11-07",
    fileUrl: "/documents/intimations/pi-nov-2024.pdf",
    fileType: "pdf",
    category: "Prior Intimation",
  },
  {
    id: "sei-003",
    title: "Closure of Trading Window",
    date: "2024-10-01",
    fileUrl: "/documents/intimations/tw-oct-2024.pdf",
    fileType: "pdf",
    category: "Trading Window",
  },
];

export const policies: FinancialDocument[] = [
  {
    id: "pol-001",
    title: "Code of Conduct for Board Members & Senior Management",
    date: "2024-04-01",
    fileUrl: "/documents/policies/code-of-conduct.pdf",
    fileType: "pdf",
    category: "Governance",
  },
  {
    id: "pol-002",
    title: "Related Party Transaction Policy",
    date: "2024-04-01",
    fileUrl: "/documents/policies/rpt-policy.pdf",
    fileType: "pdf",
    category: "Governance",
  },
  {
    id: "pol-003",
    title: "Nomination and Remuneration Policy",
    date: "2024-04-01",
    fileUrl: "/documents/policies/nomination-policy.pdf",
    fileType: "pdf",
    category: "Governance",
  },
  {
    id: "pol-004",
    title: "Dividend Distribution Policy",
    date: "2024-04-01",
    fileUrl: "/documents/policies/dividend-policy.pdf",
    fileType: "pdf",
    category: "Governance",
  },
  {
    id: "pol-005",
    title: "Whistle Blower Policy",
    date: "2024-04-01",
    fileUrl: "/documents/policies/whistle-blower.pdf",
    fileType: "pdf",
    category: "Governance",
  },
  {
    id: "pol-006",
    title: "CSR Policy",
    date: "2024-04-01",
    fileUrl: "/documents/policies/csr-policy.pdf",
    fileType: "pdf",
    category: "CSR",
  },
];

export const disclosures: FinancialDocument[] = [
  {
    id: "dis-001",
    title: "Related Party Transactions - Half Year ended September 2024",
    date: "2024-10-15",
    fileUrl: "/documents/disclosures/rpt-h1-2025.pdf",
    fileType: "pdf",
    category: "SEBI LODR",
  },
  {
    id: "dis-002",
    title: "Shareholding Pattern - September 2024",
    date: "2024-10-14",
    fileUrl: "/documents/disclosures/shp-sep-2024.pdf",
    fileType: "pdf",
    category: "SEBI LODR",
  },
  {
    id: "dis-003",
    title: "Corporate Governance Report - Q2 FY25",
    date: "2024-10-14",
    fileUrl: "/documents/disclosures/cgr-q2-2025.pdf",
    fileType: "pdf",
    category: "SEBI LODR",
  },
];

export const annualReports: FinancialDocument[] = [
  {
    id: "ar-2024",
    title: "Annual Report 2023-24",
    date: "2024-08-30",
    fileUrl: "/documents/annual-reports/ar-2023-24.pdf",
    fileType: "pdf",
    category: "Annual Report",
  },
  {
    id: "ar-2023",
    title: "Annual Report 2022-23",
    date: "2023-08-30",
    fileUrl: "/documents/annual-reports/ar-2022-23.pdf",
    fileType: "pdf",
    category: "Annual Report",
  },
  {
    id: "ar-2022",
    title: "Annual Report 2021-22",
    date: "2022-08-30",
    fileUrl: "/documents/annual-reports/ar-2021-22.pdf",
    fileType: "pdf",
    category: "Annual Report",
  },
];

export const unclaimedDividends = {
  iepfInfo: {
    title: "Investor Education and Protection Fund (IEPF)",
    description: "In terms of Section 124(5) of the Companies Act, 2013, unclaimed dividends for 7 consecutive years are transferred to the Investor Education and Protection Fund (IEPF).",
    nodal_officer: {
      name: "Shruti Jain",
      designation: "Company Secretary",
      email: "cs@bhansaliabs.com",
      phone: "+91-22-25291326",
    },
  },
  dividendHistory: [
    { year: "2023-24", type: "Final", amount: "₹1.50 per share", recordDate: "2024-09-15", dueForTransfer: "2031-10-15" },
    { year: "2022-23", type: "Final", amount: "₹1.25 per share", recordDate: "2023-09-10", dueForTransfer: "2030-10-10" },
    { year: "2021-22", type: "Final", amount: "₹1.00 per share", recordDate: "2022-09-12", dueForTransfer: "2029-10-12" },
  ],
};
