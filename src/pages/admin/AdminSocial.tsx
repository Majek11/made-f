import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2 } from "lucide-react";

const SOCIAL_KEYS = [
  "contact_email",
  "contact_phone",
  "contact_address",
  "social_twitter",
  "social_facebook",
  "social_instagram",
  "social_linkedin",
  "social_youtube",
];

const LABELS: Record<string, string> = {
  contact_email: "Contact Email",
  contact_phone: "Contact Phone",
  contact_address: "Contact Address",
  social_twitter: "Twitter / X URL",
  social_facebook: "Facebook URL",
  social_instagram: "Instagram URL",
  social_linkedin: "LinkedIn URL",
  social_youtube: "YouTube URL",
};

const AdminSocial = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", SOCIAL_KEYS);
      const map: Record<string, string> = {};
      data?.forEach((r) => { map[r.key] = r.value ?? ""; });
      setSettings(map);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await Promise.all(
      Object.entries(settings).map(([key, value]) =>
        supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" })
      )
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return (
    <div className="p-8 flex justify-center py-24">
      <Loader2 size={28} className="animate-spin text-primary" />
    </div>
  );

  const contactKeys = SOCIAL_KEYS.filter((k) => k.startsWith("contact_"));
  const socialKeys = SOCIAL_KEYS.filter((k) => k.startsWith("social_"));

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Social & Contact</h1>
        <p className="font-body text-muted-foreground mt-1">Update contact details and social media profile links.</p>
      </div>

      <div className="space-y-6">
        {/* Contact Info */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <h2 className="font-display text-lg font-bold text-foreground">Contact Information</h2>
          {contactKeys.map((key) => (
            <div key={key}>
              <label className="font-body text-sm font-semibold text-foreground block mb-2">{LABELS[key]}</label>
              {key === "contact_address" ? (
                <textarea
                  value={settings[key] ?? ""}
                  onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                  rows={2}
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
        </div>

        {/* Social Links */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <h2 className="font-display text-lg font-bold text-foreground">Social Media Links</h2>
          {socialKeys.map((key) => (
            <div key={key}>
              <label className="font-body text-sm font-semibold text-foreground block mb-2">{LABELS[key]}</label>
              <input
                value={settings[key] ?? ""}
                onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving} className="btn-gold gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSocial;
