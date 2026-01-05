import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useBlogs, Blog } from "@/hooks/useBlogs";
import { Layout } from "@/components/bhansali/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Image,
  Eye,
  EyeOff,
  Loader2,
  LayoutDashboard,
  FileText,
  Mail,
  Settings,
} from "lucide-react";
import { format } from "date-fns";

export default function Admin() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { blogs, loading: blogsLoading, createBlog, updateBlog, deleteBlog, uploadImage } = useBlogs(false);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category: "General",
    tags: "",
    is_published: false,
    author_name: "",
    read_time: "5 min read",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"blogs" | "contacts" | "settings">("blogs");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      category: "General",
      tags: "",
      is_published: false,
      author_name: "",
      read_time: "5 min read",
    });
    setEditingBlog(null);
  };

  const openEditDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      cover_image: blog.cover_image || "",
      category: blog.category,
      tags: blog.tags?.join(", ") || "",
      is_published: blog.is_published,
      author_name: blog.author_name || "",
      read_time: blog.read_time || "5 min read",
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingBlog ? prev.slug : generateSlug(title),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setFormData((prev) => ({ ...prev, cover_image: url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const blogData = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt || null,
      content: formData.content,
      cover_image: formData.cover_image || null,
      category: formData.category,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      is_published: formData.is_published,
      published_at: formData.is_published ? new Date().toISOString() : null,
      author_id: user?.id || null,
      author_name: formData.author_name || user?.email || "Admin",
      read_time: formData.read_time,
    };

    if (editingBlog) {
      await updateBlog(editingBlog.id, blogData);
    } else {
      await createBlog(blogData);
    }

    setSaving(false);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-hero-gradient py-20">
        <div className="container">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Admin Panel</h1>
              <p className="text-muted-foreground">Manage your website content</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={activeTab === "blogs" ? "default" : "outline"}
              onClick={() => setActiveTab("blogs")}
              className={activeTab === "blogs" ? "bg-gradient-primary" : ""}
            >
              <FileText className="h-4 w-4 mr-2" />
              Blogs
            </Button>
            <Button
              variant={activeTab === "contacts" ? "default" : "outline"}
              onClick={() => setActiveTab("contacts")}
              className={activeTab === "contacts" ? "bg-gradient-primary" : ""}
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Messages
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "outline"}
              onClick={() => setActiveTab("settings")}
              className={activeTab === "settings" ? "bg-gradient-primary" : ""}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          {activeTab === "blogs" && (
            <>
              {/* Add Blog Button */}
              <div className="flex justify-end mb-6">
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Blog
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
                    <DialogHeader>
                      <DialogTitle>
                        {editingBlog ? "Edit Blog" : "Create New Blog"}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Blog title"
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slug">Slug</Label>
                          <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                            placeholder="blog-slug"
                            required
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                            placeholder="General"
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={formData.tags}
                            onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                            placeholder="tech, news, update"
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="author_name">Author Name</Label>
                          <Input
                            id="author_name"
                            value={formData.author_name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, author_name: e.target.value }))}
                            placeholder="Author name"
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="read_time">Read Time</Label>
                          <Input
                            id="read_time"
                            value={formData.read_time}
                            onChange={(e) => setFormData((prev) => ({ ...prev, read_time: e.target.value }))}
                            placeholder="5 min read"
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Brief description of the blog"
                          rows={2}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                          placeholder="Write your blog content here..."
                          rows={10}
                          required
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <div className="flex gap-4 items-center">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="bg-background/50"
                          />
                          {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                        </div>
                        {formData.cover_image && (
                          <div className="mt-2">
                            <img
                              src={formData.cover_image}
                              alt="Cover preview"
                              className="h-32 w-auto object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_published"
                          checked={formData.is_published}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, is_published: checked }))
                          }
                        />
                        <Label htmlFor="is_published">Publish immediately</Label>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsDialogOpen(false);
                            resetForm();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={saving} className="bg-gradient-primary">
                          {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                          {editingBlog ? "Update Blog" : "Create Blog"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Blog List */}
              {blogsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : blogs.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                  <p className="text-muted-foreground">Create your first blog post to get started.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="glass-card p-4 flex items-center gap-4"
                    >
                      {blog.cover_image ? (
                        <img
                          src={blog.cover_image}
                          alt={blog.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{blog.title}</h3>
                          {blog.is_published ? (
                            <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              Published
                            </span>
                          ) : (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                              <EyeOff className="h-3 w-3" />
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {blog.excerpt || blog.content.slice(0, 100)}...
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{blog.category}</span>
                          <span>•</span>
                          <span>{format(new Date(blog.created_at), "MMM d, yyyy")}</span>
                          <span>•</span>
                          <span>{blog.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the blog post.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(blog.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "contacts" && <ContactMessages />}
          {activeTab === "settings" && <AdminSettings />}
        </div>
      </div>
    </Layout>
  );
}

// Contact Messages Component
function ContactMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
    fetchMessages();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {messages.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
          <p className="text-muted-foreground">Contact form submissions will appear here.</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className={`glass-card p-4 ${!msg.is_read ? 'border-primary/50' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-sm text-muted-foreground">{msg.email}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">
                  {format(new Date(msg.created_at), "MMM d, yyyy h:mm a")}
                </span>
                {!msg.is_read && (
                  <Button size="sm" variant="outline" className="ml-2" onClick={() => markAsRead(msg.id)}>
                    Mark Read
                  </Button>
                )}
              </div>
            </div>
            {msg.subject && <p className="font-medium mb-2">{msg.subject}</p>}
            <p className="text-sm text-muted-foreground">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

// Admin Settings Component
function AdminSettings() {
  return (
    <div className="glass-card p-8">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      <p className="text-muted-foreground mb-4">
        To change your password, use the Supabase dashboard or contact the system administrator.
      </p>
      <p className="text-sm text-muted-foreground">
        Your account is managed through secure authentication. Password changes can be made through the password reset flow on the login page.
      </p>
    </div>
  );
}