import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Filter } from "lucide-react";
import { financialNews, categories, type NewsItem } from "@/data/newsData";

const categoryColors: Record<string, string> = {
  Markets: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Bonds: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "Mutual Funds": "bg-green-500/10 text-green-600 dark:text-green-400",
  Banking: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Economy: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  Policy: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  IPO: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  Stocks: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Taxation: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Commodities: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  Forex: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Retirement: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  Insurance: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Fintech: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Real Estate": "bg-lime-500/10 text-lime-700 dark:text-lime-400",
  Gold: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Savings: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Fixed Income": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Regulation: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Pharma: "bg-red-500/10 text-red-600 dark:text-red-400",
  Auto: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  Loans: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
};

export function NewsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredNews =
    activeCategory === "All"
      ? financialNews
      : financialNews.filter((news) => news.category === activeCategory);

  const visibleNews = filteredNews.slice(0, visibleCount);

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Latest Financial News
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredNews.length} stories from India's financial markets
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(12);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleNews.map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredNews.length && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + 12)}
            >
              Load More News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ news, index }: { news: NewsItem; index: number }) {
  return (
    <Link to={`/blog/${news.id}`}>
      <Card
        className="h-full animate-fade-up opacity-0 transition-all hover:shadow-lg hover:border-secondary/30"
        style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
      >
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`rounded px-2 py-0.5 text-xs font-medium ${
                categoryColors[news.category] || "bg-muted text-muted-foreground"
              }`}
            >
              {news.category}
            </span>
            <span className="text-xs text-muted-foreground">{news.source}</span>
          </div>
          <h3 className="mb-2 line-clamp-3 text-sm font-semibold leading-snug text-foreground transition-colors hover:text-secondary">
            {news.title}
          </h3>
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            <span>{news.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {news.readTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
