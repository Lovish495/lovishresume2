import { Helmet } from "react-helmet-async";
import { Factory, Users, Award, Globe, Target, Eye, CheckCircle } from "lucide-react";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { companyData } from "@/data/bhansali/companyData";

export default function AboutUs() {
  return (
    <Layout>
      <Helmet>
        <title>About Us | Bhansali Engineering Polymers Limited</title>
        <meta name="description" content="Learn about BEPL - India's leading ABS manufacturer with 40+ years of excellence and JV partnership with Nippon A&L Inc., Japan." />
      </Helmet>

      <PageHeader
        title="About Us"
        subtitle="India's leading manufacturer of ABS Resins & related products for more than three decades."
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Company Overview */}
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold">
                Company <span className="text-gradient">Overview</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {companyData.about.intro}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {companyData.about.description}
              </p>

              {/* Key Facts */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: Factory, label: "Founded", value: companyData.founded },
                  { icon: Globe, label: "Listed On", value: companyData.listed },
                  { icon: Award, label: "Certification", value: companyData.certification },
                  { icon: Users, label: "JV Partner", value: "Nippon A&L" },
                ].map((item, index) => (
                  <div key={index} className="data-card">
                    <item.icon className="w-6 h-6 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="space-y-6">
              <div className="data-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {companyData.about.vision}
                </p>
              </div>

              <div className="data-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {companyData.about.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Industries <span className="text-gradient">We Serve</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our engineering polymers are trusted by leading manufacturers across diverse industries worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {companyData.industries.map((industry, index) => (
              <div 
                key={index} 
                className="data-card text-center py-8 hover:border-primary/50 transition-all"
              >
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-medium text-foreground">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Our <span className="text-gradient">Certifications</span>
            </h2>
            <p className="text-muted-foreground">
              Quality and excellence recognized by international standards
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {companyData.certifications.map((cert, index) => (
              <div 
                key={index}
                className="data-card flex items-center gap-4 px-8 py-6"
              >
                <Award className="w-10 h-10 text-primary" />
                <span className="font-display text-xl font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
