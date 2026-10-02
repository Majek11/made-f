import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface NewsItem {
  id: string;
  type: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  image_url: string | null;
  external_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export const useNewsItems = (type: string) => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("news_items")
        .select("*")
        .eq("type", type)
        .eq("published", true)
        .order("published_at", { ascending: false });
      setItems(data ?? []);
      setLoading(false);
    };
    fetch();
  }, [type]);

  return { items, loading };
};
