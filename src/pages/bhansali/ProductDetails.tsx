import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { productsData } from "@/data/bhansali/productsData";

export default function ProductDetails() {
  const { category } = useParams<{ category: string }>();
  const product = productsData.find(p => p.id === category);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{product.name} - {product.fullName} | BEPL</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <PageHeader
        title={product.name}
        subtitle={product.fullName}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: product.name }
        ]}
      >
        <Link to="/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </PageHeader>

      {/* Product Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Description */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold">
                About <span className="text-gradient">{product.name}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="pt-4">
                <h3 className="font-semibold text-foreground mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="data-card">
              <h3 className="font-display text-xl font-bold mb-6">Applications</h3>
              <div className="flex flex-wrap gap-3">
                {product.applications.map((app, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grades Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Available <span className="text-gradient">Grades</span>
            </h2>
            <p className="text-muted-foreground">
              Choose from our range of specialized grades for your specific application needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.grades.map((grade, index) => (
              <div
                key={index}
                className="data-card animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {grade.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {grade.description}
                </p>

                {grade.properties && (
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">
                      Properties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {grade.properties.map((prop, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">
                    Applications
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {grade.applications.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              Need Technical Assistance?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our technical team can help you select the right grade for your specific application requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact-us">
                <Button className="bg-gradient-to-r from-primary to-secondary">
                  Contact Technical Team
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/product-finder">
                <Button variant="outline">
                  Use Product Finder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
