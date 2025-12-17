import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { allArticles, categoryColors } from "@/data/articlesData";

const BlogPost = () => {
  const { id } = useParams();
  const article = allArticles.find((a) => a.id === Number(id));

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = allArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{article.title} | Lovish Singhal</title>
        <meta name="description" content={article.description} />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container">
            <Link to="/blog">
              <Button variant="ghost" className="mb-6 text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="max-w-3xl">
              <Badge variant="secondary" className={`${categoryColors[article.category]} mb-4`}>
                {article.category}
              </Badge>
              <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80">
                {article.description}
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="relative -mt-4 mb-8 md:-mt-8">
          <div className="container">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl shadow-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="h-64 w-full object-cover md:h-96"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="bg-background py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border">
                <div dangerouslySetInnerHTML={{ __html: formatContent(article.content) }} />
              </article>

              {/* Share */}
              <div className="mt-12 border-t pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Share this article</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`, '_blank')}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-muted py-12 md:py-16">
            <div className="container">
              <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link key={related.id} to={`/blog/${related.id}`} className="group">
                    <div className="flex gap-4 rounded-lg bg-background p-4 transition-shadow hover:shadow-md">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <Badge variant="secondary" className={`${categoryColors[related.category]} mb-2`}>
                          {related.category}
                        </Badge>
                        <h3 className="font-semibold text-foreground transition-colors group-hover:text-secondary">
                          {related.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{related.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

// Simple markdown to HTML converter
function formatContent(content: string): string {
  return content
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\| (.*) \|$/gm, (match) => {
      const cells = match.slice(1, -1).split('|').map(cell => cell.trim());
      return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*?<\/tr>\n?)+/g, '<table><tbody>$&</tbody></table>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hultop])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hultop])/g, '$1')
    .replace(/(<\/[hultop][^>]*>)<\/p>/g, '$1');
}

export default BlogPost;
