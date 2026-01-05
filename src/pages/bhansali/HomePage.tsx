import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Factory, FlaskConical, Globe, Award, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/bhansali/Layout";
import { FinancialCard } from "@/components/bhansali/FinancialCard";
import { ProductCard } from "@/components/bhansali/ProductCard";
import { MoleculeAnimation } from "@/components/bhansali/MoleculeAnimation";
import { BlogSection } from "@/components/bhansali/BlogSection";
import { companyData, financialSnapshot } from "@/data/bhansali/companyData";
import { productsData } from "@/data/bhansali/productsData";

const highlights = [
  { icon: Factory, label: "Manufacturing Plants", value: "2", description: "State-of-the-art facilities" },
  { icon: FlaskConical, label: "Product Grades", value: "100+", description: "Customized solutions" },
  { icon: Globe, label: "Countries Exported", value: "25+", description: "Global presence" },
  { icon: Award, label: "Years of Excellence", value: "40+", description: "Industry leadership" },
];

export default function HomePage() {
  return (
    <Layout showTicker={false}>
      <Helmet>
        <title>Bhansali Engineering Polymers Limited | ABS, ASA, PC-ABS Manufacturer</title>
        <meta name="description" content="India's leading manufacturer of ABS Resins, ASA, PC-ABS and specialty polymers. ISO 9001:2015 certified with JV partnership with Nippon A&L Inc., Japan." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-mesh" />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light animate-fade-up">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">BSE: BEPL • ISO 9001:2015 Certified</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up animation-delay-100">
                Engineering <br />
                <span className="text-gradient">Tomorrow's</span> <br />
                Polymers
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-muted-foreground max-w-lg animate-fade-up animation-delay-200">
                India's leading manufacturer of ABS, ASA, PC-ABS and specialty engineering polymers with 40+ years of excellence.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-300">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold px-8 shadow-glow hover:shadow-glow-lg transition-all duration-300">
                    Explore Products
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about-us">
                  <Button size="lg" variant="outline" className="border-border hover:border-primary hover:bg-primary/5 px-8">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 animate-fade-up animation-delay-400">
                {highlights.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="font-display text-3xl font-bold text-foreground">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Molecule Animation */}
            <div className="hidden lg:flex items-center justify-center animate-fade-in animation-delay-500">
              <MoleculeAnimation className="scale-125" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Financial Snapshot Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Financial <span className="text-gradient">Snapshot</span>
            </h2>
            <p className="text-muted-foreground">{financialSnapshot.fiscalYear} • All figures in {financialSnapshot.unit}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialSnapshot.metrics.map((metric, index) => (
              <FinancialCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                displayValue={metric.displayValue}
                change={metric.change}
                isPositive={metric.isPositive}
                delay={index * 150}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/financial-result">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                View All Financial Results
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient">Products</span>
              </h2>
              <p className="text-muted-foreground max-w-lg">
                World-class engineering polymers for automotive, electronics, appliances, and consumer goods industries.
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                fullName={product.fullName}
                description={product.description}
                features={product.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                About <span className="text-gradient">BEPL</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {companyData.about.intro}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {companyData.about.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/about-us">
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/history-milestone">
                  <Button variant="outline">
                    Our History
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Factory, title: "2 Manufacturing Plants", desc: "Satnoor & Abu Road" },
                { icon: Users, title: "JV with Nippon A&L", desc: "Japanese Technology Partner" },
                { icon: Award, title: "ISO Certified", desc: "9001:2015 Quality Standard" },
                { icon: TrendingUp, title: "40+ Years", desc: "Industry Experience" },
              ].map((item, index) => (
                <div key={index} className="data-card">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Work <span className="text-gradient">Together?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact our team to discuss your polymer requirements and discover how we can support your applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact-us">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary shadow-glow hover:shadow-glow-lg px-8">
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/product-finder">
                <Button size="lg" variant="outline" className="px-8">
                  Find Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
