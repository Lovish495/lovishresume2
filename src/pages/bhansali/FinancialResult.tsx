import { Helmet } from "react-helmet-async";
import { FileText, Download, Calendar } from "lucide-react";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { financialResults } from "@/data/bhansali/financialData";
import { Button } from "@/components/ui/button";

export default function FinancialResult() {
  return (
    <Layout>
      <Helmet>
        <title>Financial Results | BEPL Investor Relations</title>
        <meta name="description" content="View BEPL quarterly and annual financial results, reports and disclosures." />
      </Helmet>
      <PageHeader title="Financial Results" subtitle="Quarterly and annual financial performance reports." breadcrumbs={[{ label: "Investors" }, { label: "Financial Results" }]} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            {financialResults.map((doc) => (
              <div key={doc.id} className="data-card flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-3 h-3" />{doc.date}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Download</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
