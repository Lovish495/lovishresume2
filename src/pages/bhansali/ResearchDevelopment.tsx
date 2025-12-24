import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { FlaskConical, Cog, Microscope, Settings } from "lucide-react";
import { technologies, rdProjects } from "@/data/bhansali/caseStudiesData";

const iconMap = { FlaskConical, Cog, Microscope, Settings };

export default function ResearchDevelopment() {
  return (
    <Layout>
      <Helmet><title>Research & Development | BEPL</title></Helmet>
      <PageHeader title="Research & Development" subtitle="World-class R&D capabilities driving innovation in engineering polymers." breadcrumbs={[{ label: "R&D" }]} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {technologies.map((tech, i) => {
              const Icon = iconMap[tech.icon as keyof typeof iconMap];
              return (
                <div key={i} className="data-card text-center">
                  <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display font-bold mb-2">{tech.title}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              );
            })}
          </div>
          <h2 className="font-display text-2xl font-bold mb-8">Current <span className="text-gradient">Projects</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {rdProjects.slice(0, 4).map((project) => (
              <div key={project.id} className="data-card">
                <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Completed' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>{project.status}</span>
                <h3 className="font-display text-lg font-bold mt-3 mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
