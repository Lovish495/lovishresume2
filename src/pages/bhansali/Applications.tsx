import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { applicationCategories } from "@/data/bhansali/productsData";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Applications() {
  const [activeTab, setActiveTab] = useState(applicationCategories[0].id);
  const activeCategory = applicationCategories.find(c => c.id === activeTab);

  return (
    <Layout>
      <Helmet><title>Applications | BEPL</title></Helmet>
      <PageHeader title="Applications" subtitle="Discover how our polymers are used across diverse industries." breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Applications" }]} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {applicationCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={cn("px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all", activeTab === cat.id ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary")}>
                {cat.name}
              </button>
            ))}
          </div>
          {activeCategory && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategory.applications.map((app, i) => (
                <div key={i} className="data-card">
                  <h3 className="font-semibold mb-2">{app.name}</h3>
                  <div className="flex flex-wrap gap-2">{app.products.map((p, j) => <span key={j} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{p}</span>)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
