import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Pencil, Trash2, Loader2, X, Save } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

const NEWS_TYPES = [
  { value: "blog", label: "Blog" },
  { value: "press_release", label: "Press Release" },
  { value: "speech", label: "Speech" },
  { value: "newsletter", label: "Newsletter" },
  { value: "communique", label: "Communique" },
  { value: "photo_news", label: "Photo News" },
  { value: "made_in_news", label: "MADE in the News" },
];

interface NewsItem {
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
  created_at: string;
}

const EMPTY_FORM = {
  type: "blog",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "",
  image_url: "",
  external_url: "",
  published: false,
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AdminNewsroom = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const query = supabase
      .from("news_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (filterType !== "all") query.eq("type", filterType);
    const { data } = await query;
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [filterType]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (item: NewsItem) => {
    setForm({
      type: item.type,
      title: item.title,
      slug: item.slug ?? "",
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      author: item.author ?? "",
      image_url: item.image_url ?? "",
      external_url: item.external_url ?? "",
      published: item.published,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      created_by: user?.id,
      published_at: form.published ? new Date().toISOString() : null,
    };

    if (editingId) {
      await supabase.from("news_items").update(payload).eq("id", editingId);
    } else {
      await supabase.from("news_items").insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("news_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const typeLabel = (t: string) => NEWS_TYPES.find((n) => n.value === t)?.label ?? t;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Newsroom</h1>
          <p className="font-body text-muted-foreground mt-1">Manage all news content: blogs, speeches, press releases, and more.</p>
        </div>
        <button onClick={openCreate} className="btn-gold gap-2">
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {[{ value: "all", label: "All" }, ...NEWS_TYPES].map((t) => (
          <button
            key={t.value}
            onClick={() => setFilterType(t.value)}
            className={`px-3 py-1.5 rounded-full font-body text-xs font-semibold transition-colors ${
              filterType === t.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-24"><Loader2 size={28} className="animate-spin text-primary" /></div>
      ) : items.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-2xl p-16 text-center">
          <p className="font-body text-muted-foreground">No items yet. Click "Add Item" to create one.</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3.5 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3.5 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3.5 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-body text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-xs font-medium">
                      {typeLabel(item.type)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full font-body text-xs font-semibold ${
                      item.published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                    }`}>
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-body text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-card rounded-3xl border border-border shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
              <h2 className="font-display text-xl font-bold text-foreground">
                {editingId ? "Edit Item" : "Add News Item"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {NEWS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3 self-end pb-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors" />
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                  </label>
                  <span className="font-body text-sm text-foreground">Published</span>
                </div>
              </div>

              {[
                { key: "title", label: "Title *" },
                { key: "slug", label: "Slug (auto-generated if blank)" },
                { key: "author", label: "Author" },
                { key: "image_url", label: "Image URL" },
                { key: "external_url", label: "External URL (for MADE in the News)" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">{label}</label>
                  <input
                    value={(form as unknown as Record<string, string>)[key]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}

              <div>
                <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Content</label>
                <RichTextEditor
                  value={form.content}
                  onChange={(html) => setForm((p) => ({ ...p, content: html }))}
                  placeholder="Write article content here…"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex gap-3 justify-end rounded-b-3xl">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="btn-gold text-sm px-5 py-2.5 gap-2">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsroom;
