import { Link } from "react-router-dom";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { headlineNews, financialNews } from "@/data/newsData";

export function HeadlineNews() {
  const topNews = financialNews.slice(0, 4);

  return (
    <section className="bg-primary py-8 md:py-12">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Headline */}
          <div className="lg:col-span-2">
            <Link to={`/blog/${headlineNews.id}`} className="group block">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={headlineNews.image}
                  alt={headlineNews.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="breaking-badge">
                      <Zap className="h-3 w-3" />
                      Breaking
                    </span>
                    <span className="news-badge bg-accent text-accent-foreground">
                      Exclusive
                    </span>
                    <span className="text-xs text-primary-foreground/70">
                      {headlineNews.date}
                    </span>
                  </div>
                  <h1 className="font-heading text-2xl font-bold leading-tight text-primary-foreground md:text-3xl lg:text-4xl">
                    {headlineNews.title}
                  </h1>
                  <p className="mt-3 line-clamp-2 text-sm text-primary-foreground/80 md:text-base">
                    {headlineNews.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-primary-foreground/60">
                      <Clock className="h-3 w-3" />
                      {headlineNews.readTime}
                    </span>
                    <span className="text-xs font-medium text-secondary">
                      Read Full Story →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Side Headlines */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
                Top Stories
              </h2>
              <Button variant="link" size="sm" className="text-secondary" asChild>
                <Link to="/blog">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
            {topNews.map((news, index) => (
              <Link
                key={news.id}
                to={`/blog/${news.id}`}
                className="group block rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-4 transition-all hover:border-secondary/30 hover:bg-primary-foreground/10"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-secondary/20 text-xs font-bold text-secondary">
                    {index + 1}
                  </span>
                  <span className="text-xs font-medium text-secondary">
                    {news.category}
                  </span>
                  <span className="text-xs text-primary-foreground/50">
                    {news.source}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold text-primary-foreground transition-colors group-hover:text-secondary">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
