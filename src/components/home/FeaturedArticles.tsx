import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";
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
];

const categoryColors: Record<string, string> = {
  Taxation: "bg-amber-100 text-amber-800",
  Bonds: "bg-blue-100 text-blue-800",
  Investing: "bg-emerald-100 text-emerald-800",
};

export function FeaturedArticles() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Latest Insights
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore the latest articles on finance, taxation, and investing.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article, index) => (
            <Link key={article.id} to={`/blog/${article.id}`}>
              <Card 
                variant="article"
                className="h-full animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                {/* Image */}
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
      </div>
    </section>
  );
}
