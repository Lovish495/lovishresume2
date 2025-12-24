import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { caseStudiesData } from "@/data/bhansali/caseStudiesData";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CaseStudy() {
  return (
    <Layout>
      <Helmet><title>Case Studies | BEPL</title></Helmet>
      <PageHeader title="Case Studies" subtitle="Technical insights and solutions for common moulding challenges." breadcrumbs={[{ label: "R&D", href: "/research-development" }, { label: "Case Studies" }]} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudiesData.map((study) => (
              <Link key={study.id} to={`/case-study-details/${study.id}`} className="data-card group">
                <span className="text-xs text-primary font-medium">{study.category}</span>
                <h3 className="font-display text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{study.description}</p>
                <span className="text-primary text-sm flex items-center gap-1">Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
