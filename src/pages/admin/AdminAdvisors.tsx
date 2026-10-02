import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, GripVertical } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";

interface Advisor {
  id: string;
  name: string;
  title: string;
  slug: string;
  short_bio: string;
  full_bio: string | null;
  image_url: string | null;
  education: string | null;
  area: string;
  display_order: number;
  is_active: boolean;
}

const EMPTY: Omit<Advisor, "id"> = {
  name: "",
  title: "Advisory Board Member",
  slug: "",
  short_bio: "",
  full_bio: "",
  image_url: "",
  education: "",
  area: "",
  display_order: 0,
  is_active: true,
};

const AdminAdvisors = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Advisor | null>(null);
  const [form, setForm] = useState<Omit<Advisor, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchAdvisors = async () => {
    const { data } = await supabase
      .from("advisors")
      .select("*")
      .order("display_order", { ascending: true });
    setAdvisors((data as Advisor[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY, display_order: advisors.length + 1 });
    setImageFile(null);
    setDialogOpen(true);
  };

  const openEdit = (a: Advisor) => {
    setEditing(a);
    setForm({
      name: a.name,
      title: a.title,
      slug: a.slug,
      short_bio: a.short_bio,
      full_bio: a.full_bio || "",
      image_url: a.image_url || "",
      education: a.education || "",
      area: a.area,
      display_order: a.display_order,
      is_active: a.is_active,
    });
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      toast({ title: "Name and slug are required", variant: "destructive" });
      return;
    }
    setSaving(true);

    let imageUrl = form.image_url;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `advisors/${form.slug}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("site-media")
        .upload(path, imageFile, { upsert: true });
      if (uploadErr) {
        toast({ title: "Image upload failed", description: uploadErr.message, variant: "destructive" });
        setSaving(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("site-media").getPublicUrl(path);
      imageUrl = urlData.publicUrl;
    }

    const payload = {
      name: form.name,
      title: form.title,
      slug: form.slug,
      short_bio: form.short_bio,
      full_bio: form.full_bio || null,
      image_url: imageUrl || null,
      education: form.education || null,
      area: form.area,
      display_order: form.display_order,
      is_active: form.is_active,
    };

    if (editing) {
      const { error } = await supabase.from("advisors").update(payload).eq("id", editing.id);
      if (error) {
        toast({ title: "Update failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Advisor updated" });
      }
    } else {
      const { error } = await supabase.from("advisors").insert(payload);
      if (error) {
        toast({ title: "Insert failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Advisor added" });
      }
    }

    setSaving(false);
    setDialogOpen(false);
    fetchAdvisors();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this advisor?")) return;
    await supabase.from("advisors").delete().eq("id", id);
    toast({ title: "Advisor deleted" });
    fetchAdvisors();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Advisory Board</h1>
          <p className="font-body text-muted-foreground mt-1">Manage advisory board members and display order.</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={16} /> Add Advisor
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={28} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          {advisors.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <GripVertical size={16} className="text-muted-foreground" />
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                {a.image_url ? (
                  <img src={a.image_url} alt={a.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground font-display font-bold">
                    {a.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-foreground truncate">{a.name}</p>
                <p className="font-body text-sm text-muted-foreground">{a.area}</p>
              </div>
              {!a.is_active && (
                <span className="text-xs bg-muted px-2 py-1 rounded font-body text-muted-foreground">Hidden</span>
              )}
              <Button variant="ghost" size="icon" onClick={() => openEdit(a)}>
                <Pencil size={14} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Advisor" : "Add Advisor"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({ ...f, name, slug: editing ? f.slug : generateSlug(name) }));
                  }}
                />
              </div>
              <div>
                <Label>Title / Role</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Slug *</Label>
                <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
              </div>
              <div>
                <Label>Area of Expertise</Label>
                <Input value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Display Order</Label>
                <Input type="number" value={form.display_order} onChange={(e) => setForm((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} />
              </div>
            </div>
            <div>
              <Label>Short Bio (displayed on card)</Label>
              <Textarea value={form.short_bio} onChange={(e) => setForm((f) => ({ ...f, short_bio: e.target.value }))} rows={3} />
            </div>
            <div>
              <Label>Education</Label>
              <Input value={form.education || ""} onChange={(e) => setForm((f) => ({ ...f, education: e.target.value }))} />
            </div>
            <div>
              <Label>Photo</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              {form.image_url && !imageFile && (
                <img src={form.image_url} alt="Current" className="w-20 h-20 rounded-lg object-cover mt-2" />
              )}
            </div>
            <div>
              <Label>Full Biography (profile page)</Label>
              <RichTextEditor value={form.full_bio || ""} onChange={(val) => setForm((f) => ({ ...f, full_bio: val }))} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))} />
              <Label>Active (visible on site)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 size={14} className="animate-spin" />}
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdvisors;
