import { Helmet } from "react-helmet-async";
import { Briefcase, MapPin, Clock, GraduationCap, Users, Lightbulb, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { jobsData, departments, locations as jobLocations, careerHighlights } from "@/data/bhansali/jobsData";
import { cn } from "@/lib/utils";

const iconMap = {
  GraduationCap,
  Users,
  Lightbulb,
};

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const filteredJobs = jobsData.filter(job => {
    const matchesDept = selectedDept === "All Departments" || job.department === selectedDept;
    const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
    return matchesDept && matchesLocation;
  });

  return (
    <Layout>
      <Helmet>
        <title>Careers | Bhansali Engineering Polymers Limited</title>
        <meta name="description" content="Join BEPL and be part of India's leading engineering polymers manufacturer. Explore current openings and grow your career with us." />
      </Helmet>

      <PageHeader
        title="Careers"
        subtitle="Learn. Lead. Innovate. Join our team and shape the future of engineering polymers."
        breadcrumbs={[{ label: "Careers" }]}
      />

      {/* Career Highlights */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {careerHighlights.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div key={index} className="data-card text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-2xl font-bold">
              Current <span className="text-gradient">Openings</span>
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-4 py-2 rounded-lg bg-card border border-border text-sm"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg bg-card border border-border text-sm"
              >
                {jobLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredJobs.length} positions
          </p>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="data-card"
              >
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {job.type}
                    </span>
                    <ChevronDown className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform",
                      expandedJob === job.id && "rotate-180"
                    )} />
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <div className="mt-6 pt-6 border-t border-border/50 animate-fade-in">
                    <p className="text-muted-foreground mb-6">{job.description}</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Responsibilities</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button className="bg-gradient-to-r from-primary to-secondary">
                      Apply Now
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">No openings found</h3>
              <p className="text-muted-foreground">Try adjusting your filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
