import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { Factory, Lightbulb, Handshake, Award } from "lucide-react";
import { growthHighlights } from "@/data/bhansali/historyData";

const iconMap = { Factory, Lightbulb, Handshake, Award };

export default function GrowthThroughInnovation() {
  return (
    <Layout>
      <Helmet><title>Growth Through Innovation | BEPL</title></Helmet>
      <PageHeader title="Growth Through Innovation" subtitle="Our strategic initiatives driving sustainable growth and market leadership." breadcrumbs={[{ label: "Company", href: "/about-us" }, { label: "Growth Through Innovation" }]} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {growthHighlights.map((item, i) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div key={i} className="data-card">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
