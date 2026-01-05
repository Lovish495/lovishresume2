import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/bhansali/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  author_name: string | null;
  published_at: string | null;
  read_time: string | null;
  views: number;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !data) {
      setLoading(false);
      return;
    }

    setBlog(data);

    // Increment views
    await supabase
      .from("blogs")
      .update({ views: data.views + 1 })
      .eq("id", data.id);

    // Fetch related blogs
    const { data: related } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .eq("category", data.category)
      .neq("id", data.id)
      .limit(3);

    setRelatedBlogs(related || []);
    setLoading(false);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: blog?.title,
        text: blog?.excerpt || "",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Blog link has been copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen bg-hero-gradient flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{blog.title} | BEPL Blog</title>
        <meta name="description" content={blog.excerpt || blog.content.slice(0, 160)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.content.slice(0, 160)} />
        {blog.cover_image && <meta property="og:image" content={blog.cover_image} />}
      </Helmet>

      <article className="min-h-screen bg-gradient-dark">
        {/* Hero */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {blog.cover_image ? (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="container pb-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              <span className="inline-block bg-primary/90 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4">
                {blog.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span>{blog.author_name || "Admin"}</span>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(blog.published_at || blog.created_at), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.read_time}
                </span>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div className="prose prose-invert prose-lg max-w-none">
                {blog.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-foreground/90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {relatedBlogs.length > 0 && (
                <div className="glass-card p-6 rounded-2xl sticky top-24">
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((related) => (
                      <Link
                        key={related.id}
                        to={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(related.published_at || related.created_at), "MMM d, yyyy")}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}