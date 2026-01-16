import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  read_time: string | null;
  author_name: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
  tags: string[] | null;
  views: number | null;
}

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Blog[];
    },
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;
      return data as Blog;
    },
    enabled: !!slug,
  });
}

export function useFeaturedBlogs(limit = 3) {
  return useQuery({
    queryKey: ["featured-blogs", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("views", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Blog[];
    },
  });
}
