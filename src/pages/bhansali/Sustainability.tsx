import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { sustainabilityData } from "@/data/bhansali/sustainabilityData";
import { Shield, Lightbulb, Award, Leaf, Users, GraduationCap } from "lucide-react";

const iconMap = { Shield, Lightbulb, Award, Leaf, Users, GraduationCap };

export default function Sustainability() {
  return (
    <Layout>
      <Helmet>
        <title>Sustainability | BEPL</title>
        <meta name="description" content="BEPL's commitment to sustainable manufacturing and environmental responsibility." />
      </Helmet>
      <PageHeader title="Sustainability" subtitle="Our commitment to responsible manufacturing and environmental stewardship." breadcrumbs={[{ label: "Company", href: "/about-us" }, { label: "Sustainability" }]} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">{sustainabilityData.intro}</p>
          <h2 className="font-display text-2xl font-bold mb-8">Core <span className="text-gradient">Values</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sustainabilityData.coreValues.map((value, i) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap];
              return (
                <div key={i} className="data-card">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
