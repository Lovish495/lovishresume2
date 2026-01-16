import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, TrendingUp, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFeaturedBlogs } from "@/hooks/useBlogs";
import { allArticles } from "@/data/articlesData";
import { format } from "date-fns";

const categoryColors: Record<string, string> = {
  Taxation: "bg-accent/20 text-accent-foreground border-accent/30",
  Bonds: "bg-primary/10 text-primary border-primary/20",
  Investing: "bg-secondary/20 text-secondary border-secondary/30",
};

export function FeaturedArticles() {
  const { data: dbBlogs, isLoading } = useFeaturedBlogs(3);

  // Combine database blogs with static articles as fallback
  const featuredArticles = dbBlogs && dbBlogs.length > 0
    ? dbBlogs.map((blog, index) => ({
        id: blog.slug,
        slug: blog.slug,
        title: blog.title,
        description: blog.excerpt || "",
        category: blog.category,
        readTime: blog.read_time || "5 min read",
        author: blog.author_name || "Lovish Singhal",
        date: blog.published_at 
          ? format(new Date(blog.published_at), "MMM d, yyyy") 
          : format(new Date(blog.created_at), "MMM d, yyyy"),
        image: blog.cover_image || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
        trending: index === 0,
        isFromDb: true,
      }))
    : allArticles.slice(0, 3).map((article, index) => ({
        ...article,
        id: String(article.id),
        slug: String(article.id),
        trending: index === 0,
        isFromDb: false,
      }));

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 md:flex-row md:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Latest Insights
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Featured Articles
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore the latest articles on finance, taxation, and investing.
            </p>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, index) => (
              <Link key={article.id} to={`/blog/${article.slug}`} className="group">
                <Card 
                  className="h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {article.trending && (
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="mb-2">
                      <Badge variant="outline" className={categoryColors[article.category] || "bg-muted text-muted-foreground"}>
                        {article.category}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg text-foreground transition-colors group-hover:text-primary">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-muted-foreground">
                      {article.description}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="mt-auto border-t border-border/50 pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
