import { Helmet } from "react-helmet-async";
import { User, Briefcase } from "lucide-react";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { directorsData, managementTeam } from "@/data/bhansali/directorsData";
import { cn } from "@/lib/utils";

export default function OurDirector() {
  const founder = directorsData.find(d => d.type === 'founder');
  const boardMembers = directorsData.filter(d => d.type !== 'founder');

  return (
    <Layout>
      <Helmet>
        <title>Board of Directors | Bhansali Engineering Polymers Limited</title>
        <meta name="description" content="Meet the leadership team driving BEPL's vision for excellence in engineering polymers manufacturing." />
      </Helmet>

      <PageHeader
        title="Board of Directors"
        subtitle="Meet the visionary leaders driving our success and innovation."
        breadcrumbs={[{ label: "Company", href: "/about-us" }, { label: "Board of Directors" }]}
      />

      {/* Founder Section */}
      {founder && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="data-card border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    <User className="w-16 h-16 text-primary/50" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                      Founder
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {founder.name}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Board Members */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Board <span className="text-gradient">Members</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((director) => (
              <div key={director.id} className="data-card group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center shrink-0 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
                    <User className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className={cn(
                      "inline-block px-2 py-0.5 rounded text-xs font-medium mb-1",
                      director.type === 'executive' && "bg-primary/10 text-primary",
                      director.type === 'independent' && "bg-secondary/10 text-secondary",
                      director.type === 'nominee' && "bg-accent/10 text-accent"
                    )}>
                      {director.type === 'executive' && 'Executive Director'}
                      {director.type === 'independent' && 'Independent Director'}
                      {director.type === 'nominee' && 'Nominee Director'}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {director.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{director.designation}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {director.bio}
                </p>
                {director.qualifications && (
                  <div className="flex flex-wrap gap-2">
                    {director.qualifications.map((qual, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {qual}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Management <span className="text-gradient">Team</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {managementTeam.map((member, index) => (
              <div key={index} className="data-card text-center py-6">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-muted-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
