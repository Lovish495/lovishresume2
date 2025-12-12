import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock, User, Search } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const allArticles = [
  {
    id: 1,
    title: "Understanding TDS: A Complete Guide for Beginners",
    description: "Learn about Tax Deducted at Source, its implications, and how to handle TDS in your financial planning.",
    category: "Taxation",
    readTime: "8 min read",
    author: "Lovish Singhal",
    date: "Dec 10, 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Bonds vs Fixed Deposits: Which is Right for You?",
    description: "A comprehensive comparison of bonds and fixed deposits to help you make informed investment decisions.",
    category: "Bonds",
    readTime: "6 min read",
    author: "Lovish Singhal",
    date: "Dec 8, 2025",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Building Your Emergency Fund: Step by Step",
    description: "Essential strategies to build a financial safety net that can sustain you during unexpected situations.",
    category: "Investing",
    readTime: "5 min read",
    author: "Lovish Singhal",
    date: "Dec 5, 2025",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "GST Filing: A Simple Guide for Small Businesses",
    description: "Everything you need to know about filing GST returns as a small business owner in India.",
    category: "Taxation",
    readTime: "10 min read",
    author: "Lovish Singhal",
    date: "Dec 3, 2025",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Introduction to Government Securities",
    description: "Discover the world of G-Secs and how they can be a safe investment option for your portfolio.",
    category: "Bonds",
    readTime: "7 min read",
    author: "Lovish Singhal",
    date: "Nov 28, 2025",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Understanding Mutual Funds: A Beginner's Guide",
    description: "Learn the basics of mutual funds and how to start your investment journey with SIPs.",
    category: "Investing",
    readTime: "9 min read",
    author: "Lovish Singhal",
    date: "Nov 25, 2025",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
  },
];

const categories = ["All", "Taxation", "Bonds", "Investing"];

const categoryColors: Record<string, string> = {
  Taxation: "bg-amber-100 text-amber-800",
  Bonds: "bg-blue-100 text-blue-800",
  Investing: "bg-emerald-100 text-emerald-800",
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog | Lovish Singhal - Finance & Taxation Insights</title>
        <meta
          name="description"
          content="Explore articles on taxation, bonds, investing, and financial planning. Learn to manage your money better with Lovish Singhal."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container text-center">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              Blog & Insights
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Explore articles on finance, taxation, and investing to make informed decisions.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-background py-6">
          <div className="container">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            {filteredArticles.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, index) => (
                  <Link key={article.id} to={`/blog/${article.id}`}>
                    <Card 
                      variant="article"
                      className="h-full animate-fade-up opacity-0"
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardHeader>
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="secondary" className={categoryColors[article.category]}>
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                        </div>
                        <CardTitle className="line-clamp-2 transition-colors group-hover:text-secondary">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {article.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="mt-auto text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
