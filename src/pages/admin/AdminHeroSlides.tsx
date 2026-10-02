import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Save, Loader2, UploadCloud, Plus, Trash2, GripVertical, Eye, EyeOff,
} from "lucide-react";

interface HeroSlide {
  id: string;
  display_order: number;
  tag: string;
  heading: string;
  sub_heading: string;
  image_url: string;
  is_active: boolean;
}

const AdminHeroSlides = () => {
  const { user } = useAuth();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const { data } = await supabase
      .from("hero_slides")
      .select("*")
      .order("display_order");
    setSlides((data as HeroSlide[]) ?? []);
    setLoading(false);
  };

  const handleChange = (id: string, field: keyof HeroSlide, value: string | boolean) => {
    setSlides((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = async (slide: HeroSlide) => {
    setSaving(slide.id);
    await supabase.from("hero_slides").update({
      tag: slide.tag,
      heading: slide.heading,
      sub_heading: slide.sub_heading,
      image_url: slide.image_url,
      is_active: slide.is_active,
      display_order: slide.display_order,
    }).eq("id", slide.id);
    setSaving(null);
  };

  const handleAdd = async () => {
    const maxOrder = slides.reduce((m, s) => Math.max(m, s.display_order), 0);
    const { data } = await supabase.from("hero_slides").insert({
      display_order: maxOrder + 1,
      tag: "New Slide",
      heading: "New Slide Heading",
      sub_heading: "Edit this subtitle in the admin panel.",
      image_url: "",
      is_active: true,
    }).select().single();
    if (data) setSlides((prev) => [...prev, data as HeroSlide]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    await supabase.from("hero_slides").delete().eq("id", id);
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(id);
    const path = `hero-slides/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      handleChange(id, "image_url", data.publicUrl);
      await supabase.from("media_uploads").insert({
        file_url: data.publicUrl,
        file_name: file.name,
        bucket_path: path,
        uploaded_by: user.id,
      });
    }
    setUploading(null);
    if (fileRefs.current[id]) fileRefs.current[id]!.value = "";
  };

  if (loading) return (
    <div className="p-8 flex justify-center py-24">
      <Loader2 size={28} className="animate-spin text-primary" />
    </div>
  );

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Hero Slides</h1>
          <p className="font-body text-muted-foreground mt-1">
            Manage the homepage hero carousel — edit text, upload images, and toggle visibility.
          </p>
        </div>
        <button onClick={handleAdd} className="btn-gold gap-2">
          <Plus size={16} /> Add Slide
        </button>
      </div>

      <div className="space-y-6">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            {/* Slide header */}
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/40 border-b border-border">
              <GripVertical size={16} className="text-muted-foreground" />
              <span className="font-body text-sm font-semibold text-foreground flex-1">
                Slide {idx + 1} — {slide.tag || "Untitled"}
              </span>
              <button
                onClick={() => handleChange(slide.id, "is_active", !slide.is_active)}
                title={slide.is_active ? "Hide slide" : "Show slide"}
                className={`p-1.5 rounded-lg transition-colors ${slide.is_active ? "text-primary hover:bg-primary/10" : "text-muted-foreground hover:bg-muted"}`}
              >
                {slide.is_active ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="p-5 grid md:grid-cols-2 gap-5">
              {/* Left: text fields */}
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Tag / Label</label>
                  <input
                    value={slide.tag}
                    onChange={(e) => handleChange(slide.id, "tag", e.target.value)}
                    placeholder="e.g. Community First"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Heading</label>
                  <input
                    value={slide.heading}
                    onChange={(e) => handleChange(slide.id, "heading", e.target.value)}
                    placeholder="Main slide headline"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Subtitle</label>
                  <textarea
                    value={slide.sub_heading}
                    onChange={(e) => handleChange(slide.id, "sub_heading", e.target.value)}
                    rows={3}
                    placeholder="Supporting description text"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={slide.display_order}
                    onChange={(e) => handleChange(slide.id, "display_order", e.target.value)}
                    className="w-24 px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Right: image */}
              <div className="space-y-3">
                <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide block">Background Image</label>
                {slide.image_url ? (
                  <div className="relative rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                    <img src={slide.image_url} alt="Slide background" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleChange(slide.id, "image_url", "")}
                      className="absolute top-2 right-2 bg-destructive/90 text-white rounded-lg p-1 hover:bg-destructive transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 aspect-video flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <UploadCloud size={24} />
                    <span className="font-body text-xs">No image selected</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    value={slide.image_url}
                    onChange={(e) => handleChange(slide.id, "image_url", e.target.value)}
                    placeholder="https://... or upload"
                    className="flex-1 px-3 py-2 rounded-xl border border-input bg-background text-xs font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <label className="btn-outline cursor-pointer text-xs px-3 py-2 whitespace-nowrap flex items-center gap-1.5">
                    {uploading === slide.id ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
                    Upload
                    <input
                      ref={(el) => { fileRefs.current[slide.id] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(slide.id, e)}
                      disabled={uploading === slide.id}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 flex justify-end">
              <button
                onClick={() => handleSave(slide)}
                disabled={saving === slide.id}
                className="btn-gold gap-2 text-sm"
              >
                {saving === slide.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving === slide.id ? "Saving…" : "Save Slide"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeroSlides;
