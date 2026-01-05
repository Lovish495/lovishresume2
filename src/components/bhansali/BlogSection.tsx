import { Link } from "react-router-dom";
import { useBlogs } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

export function BlogSection() {
  const { blogs, loading } = useBlogs(true);
  const latestBlogs = blogs.slice(0, 3);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-dark">
        <div className="container">
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (latestBlogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            News & <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news and insights from BEPL
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latestBlogs.map((blog, index) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group glass-card overflow-hidden rounded-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-glow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                {blog.cover_image ? (
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary/30">
                      {blog.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {blog.excerpt || blog.content.slice(0, 100)}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(blog.published_at || blog.created_at), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {blog.read_time}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}