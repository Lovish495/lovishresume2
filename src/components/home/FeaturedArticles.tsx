import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const featuredArticles = [
  {
    id: 1,
    title: "Understanding TDS: A Complete Guide for Beginners",
    description: "Learn about Tax Deducted at Source, its implications, and how to handle TDS in your financial planning.",
    category: "Taxation",
    readTime: "8 min read",
    author: "Lovish Singhal",
    date: "Dec 10, 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
    trending: true,
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
    trending: false,
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
    trending: false,
  },
];

const categoryColors: Record<string, string> = {
  Taxation: "bg-accent/20 text-accent-foreground border-accent/30",
  Bonds: "bg-primary/10 text-primary border-primary/20",
  Investing: "bg-secondary/20 text-secondary border-secondary/30",
};

export function FeaturedArticles() {
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article, index) => (
            <Link key={article.id} to={`/blog/${article.id}`} className="group">
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
                    <Badge variant="outline" className={categoryColors[article.category]}>
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
      </div>
    </section>
  );
}
