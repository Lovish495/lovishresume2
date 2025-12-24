import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { historyData } from "@/data/bhansali/historyData";
import { cn } from "@/lib/utils";

export default function HistoryMilestone() {
  return (
    <Layout>
      <Helmet>
        <title>History & Milestones | Bhansali Engineering Polymers Limited</title>
        <meta name="description" content="Explore BEPL's journey from 1984 to becoming India's leading ABS manufacturer with key milestones and achievements." />
      </Helmet>

      <PageHeader
        title="History & Milestones"
        subtitle="Four decades of innovation, growth, and excellence in engineering polymers."
        breadcrumbs={[{ label: "Company", href: "/about-us" }, { label: "History & Milestones" }]}
      />

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/50" />

              {historyData.map((milestone, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "relative pl-20 pb-12 last:pb-0 animate-fade-up",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Node */}
                  <div 
                    className={cn(
                      "absolute left-6 top-0 w-5 h-5 rounded-full border-4 -translate-x-1/2 transition-all",
                      milestone.highlight 
                        ? "bg-primary border-primary shadow-glow" 
                        : "bg-card border-border hover:border-primary hover:shadow-glow-sm"
                    )}
                  />

                  {/* Content Card */}
                  <div 
                    className={cn(
                      "data-card",
                      milestone.highlight && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className={cn(
                        "inline-flex items-center justify-center px-4 py-1.5 rounded-full font-mono text-sm font-bold",
                        milestone.highlight 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {milestone.year}
                      </span>
                      {milestone.highlight && (
                        <span className="text-xs text-primary font-medium uppercase tracking-wider">
                          Key Milestone
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
