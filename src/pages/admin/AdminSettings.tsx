import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2, UploadCloud } from "lucide-react";
import { useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

const SETTING_KEYS = [
  "logo_url",
  "site_name",
  "tagline",
  "hero_title",
  "hero_subtitle",
];

const LABELS: Record<string, string> = {
  logo_url: "Logo URL",
  site_name: "Site Name",
  tagline: "Tagline",
  hero_title: "Hero Title",
  hero_subtitle: "Hero Subtitle",
};

const AdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", SETTING_KEYS);

      const map: Record<string, string> = {};
      data?.forEach((row) => { map[row.key] = row.value ?? ""; });
      setSettings(map);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(settings).map(([key, value]) =>
      supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" })
    );
    await Promise.all(updates);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const path = `logos/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      setSettings((prev) => ({ ...prev, logo_url: data.publicUrl }));
      await supabase.from("media_uploads").insert({
        file_url: data.publicUrl,
        file_name: file.name,
        bucket_path: path,
        uploaded_by: user.id,
      });
    }
    setUploading(false);
    if (logoRef.current) logoRef.current.value = "";
  };

  if (loading) return (
    <div className="p-8 flex justify-center py-24">
      <Loader2 size={28} className="animate-spin text-primary" />
    </div>
  );

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Site Settings</h1>
        <p className="font-body text-muted-foreground mt-1">Update your logo, site name, and homepage hero content.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
        {/* Logo upload */}
        <div>
          <label className="font-body text-sm font-semibold text-foreground block mb-2">Site Logo</label>
          {settings.logo_url && (
            <img src={settings.logo_url} alt="Logo" className="h-16 rounded-lg border border-border object-contain mb-3 bg-muted p-2" />
          )}
          <div className="flex items-center gap-3">
            <input
              value={settings.logo_url ?? ""}
              onChange={(e) => setSettings((p) => ({ ...p, logo_url: e.target.value }))}
              placeholder="https://... or upload below"
              className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label className="btn-outline cursor-pointer text-sm px-4 py-2.5 whitespace-nowrap">
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <><UploadCloud size={14} /> Upload</>}
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        {/* Other settings */}
        {SETTING_KEYS.filter((k) => k !== "logo_url").map((key) => (
          <div key={key}>
            <label className="font-body text-sm font-semibold text-foreground block mb-2">{LABELS[key]}</label>
            {key === "hero_subtitle" ? (
              <textarea
                value={settings[key] ?? ""}
                onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            ) : (
              <input
                value={settings[key] ?? ""}
                onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        ))}

        <div className="flex justify-end pt-2">
          <button onClick={handleSave} disabled={saving} className="btn-gold gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
