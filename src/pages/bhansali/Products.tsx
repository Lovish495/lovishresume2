import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { ProductCard } from "@/components/bhansali/ProductCard";
import { productsData } from "@/data/bhansali/productsData";

export default function Products() {
  return (
    <Layout>
      <Helmet>
        <title>Products | Bhansali Engineering Polymers Limited</title>
        <meta name="description" content="Explore our complete range of ABS, ASA, PC-ABS, Specialty polymers, and SAN products for diverse industrial applications." />
      </Helmet>

      <PageHeader
        title="Our Products"
        subtitle="World-class engineering polymers for automotive, electronics, appliances, and consumer goods industries."
        breadcrumbs={[{ label: "Products" }]}
      >
        <Link to="/product-finder">
          <Button className="bg-gradient-to-r from-primary to-secondary">
            Product Finder
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </PageHeader>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  fullName={product.fullName}
                  description={product.description}
                  features={product.features}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications CTA */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold mb-6">
              Find the Right <span className="text-gradient">Product</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Not sure which grade suits your application? Use our Product Finder tool or contact our technical team for personalized recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/product-finder">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                  Use Product Finder
                </Button>
              </Link>
              <Link to="/applications">
                <Button size="lg" variant="outline">
                  View Applications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
