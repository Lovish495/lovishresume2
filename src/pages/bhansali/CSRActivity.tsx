import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { csrData } from "@/data/bhansali/sustainabilityData";
import { Heart, BookOpen, Stethoscope, TreePine } from "lucide-react";

export default function CSRActivity() {
  return (
    <Layout>
      <Helmet><title>CSR Activity | BEPL</title></Helmet>
      <PageHeader title="CSR Activity" subtitle={csrData.description} breadcrumbs={[{ label: "Company", href: "/about-us" }, { label: "CSR Activity" }]} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="data-card mb-12">
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="w-10 h-10 text-primary" />
              <div>
                <h2 className="font-display text-2xl font-bold">{csrData.vidyaMandir.name}</h2>
                <p className="text-muted-foreground">Established {csrData.vidyaMandir.established} • {csrData.vidyaMandir.students} Students</p>
              </div>
            </div>
            <p className="text-muted-foreground">{csrData.vidyaMandir.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="data-card">
              <Stethoscope className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-xl font-bold mb-4">Healthcare Initiatives</h3>
              <ul className="space-y-2">{csrData.healthcareInitiatives.map((item, i) => <li key={i} className="text-sm text-muted-foreground flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" />{item}</li>)}</ul>
            </div>
            <div className="data-card">
              <TreePine className="w-8 h-8 text-secondary mb-4" />
              <h3 className="font-display text-xl font-bold mb-4">Environmental Programs</h3>
              <ul className="space-y-2">{csrData.environmentalPrograms.map((item, i) => <li key={i} className="text-sm text-muted-foreground flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary rounded-full" />{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
