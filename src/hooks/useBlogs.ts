import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  author_id: string | null;
  author_name: string | null;
  is_published: boolean;
  published_at: string | null;
  read_time: string | null;
  views: number;
  created_at: string;
  updated_at: string;
}

export function useBlogs(onlyPublished = true) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBlogs = async () => {
    setLoading(true);
    let query = supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (onlyPublished) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("blogs-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blogs",
        },
        () => {
          fetchBlogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onlyPublished]);

  const createBlog = async (blog: Omit<Blog, "id" | "created_at" | "updated_at" | "views">) => {
    const { data, error } = await supabase
      .from("blogs")
      .insert([blog])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create blog",
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Success",
      description: "Blog created successfully",
    });
    return data;
  };

  const updateBlog = async (id: string, updates: Partial<Blog>) => {
    const { data, error } = await supabase
      .from("blogs")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update blog",
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Success",
      description: "Blog updated successfully",
    });
    return data;
  };

  const deleteBlog = async (id: string) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Blog deleted successfully",
    });
    return true;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  return {
    blogs,
    loading,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadImage,
  };
}

export type { Blog };