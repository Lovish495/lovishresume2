import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/bhansali/Layout";
import { PageHeader } from "@/components/bhansali/PageHeader";
import { productFinderData, productsData } from "@/data/bhansali/productsData";
import { cn } from "@/lib/utils";

export default function ProductFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", ...productsData.map(p => p.id)];

  const filteredProducts = productFinderData.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.applications.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <Helmet>
        <title>Product Finder | Bhansali Engineering Polymers Limited</title>
        <meta name="description" content="Find the right polymer grade for your application. Search and filter through our comprehensive product database." />
      </Helmet>

      <PageHeader
        title="Product Finder"
        subtitle="Search and filter through our comprehensive product database to find the perfect grade."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Product Finder" }]}
      />

      {/* Search & Filter */}
      <section className="py-10 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by product name, code, or application..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "whitespace-nowrap",
                    selectedCategory === cat && "bg-primary text-primary-foreground border-primary"
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredProducts.length} products
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Code</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">MFI</th>
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Applications</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr 
                    key={product.code}
                    className="border-b border-border/50 hover:bg-card/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-mono text-sm text-primary">{product.code}</td>
                    <td className="py-4 px-4 font-medium">{product.name}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{product.type}</td>
                    <td className="py-4 px-4 font-mono text-sm">{product.mfi}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{product.applications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
