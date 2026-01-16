import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock, User, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useBlogs } from "@/hooks/useBlogs";
import { allArticles, categoryColors, categories } from "@/data/articlesData";
import { format } from "date-fns";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: dbBlogs, isLoading } = useBlogs();

  // Combine database blogs with static articles as fallback
  const allBlogItems = [
    ...(dbBlogs?.map((blog) => ({
      id: blog.slug,
      title: blog.title,
      description: blog.excerpt || "",
      category: blog.category,
      readTime: blog.read_time || "5 min read",
      author: blog.author_name || "Lovish Singhal",
      date: blog.published_at ? format(new Date(blog.published_at), "MMM d, yyyy") : format(new Date(blog.created_at), "MMM d, yyyy"),
      image: blog.cover_image || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
      isFromDb: true,
      slug: blog.slug,
    })) || []),
    ...allArticles.map((article) => ({
      ...article,
      id: String(article.id),
      isFromDb: false,
      slug: String(article.id),
    })),
  ];

  const filteredArticles = allBlogItems.filter((article) => {
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
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, index) => (
                  <Link 
                    key={article.id} 
                    to={article.isFromDb ? `/blog/${article.slug}` : `/blog/${article.id}`}
                  >
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
                          <Badge variant="secondary" className={categoryColors[article.category] || "bg-muted text-muted-foreground"}>
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
