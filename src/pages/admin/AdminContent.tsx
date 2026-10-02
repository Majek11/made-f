import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2, Info, ChevronDown, ChevronUp, Upload, X, ImageIcon } from "lucide-react";

// ─── Key definitions ───────────────────────────────────────────────────────

const ABOUT_PAGE_KEYS = [
  "about_paragraph_1",
  "about_paragraph_2",
  "about_paragraph_3",
  "about_tags",
];

const HOME_ABOUT_KEYS = [
  "home_about_tag",
  "home_about_heading",
  "home_about_heading_italic",
  "home_about_p1",
  "home_about_p2",
  "home_about_badge_title",
  "home_about_badge_sub",
  "home_about_btn",
  "img_about",
];

const HOME_WHATWEDO_KEYS = [
  "home_whatwedo_tag",
  "home_whatwedo_heading",
  "home_whatwedo_heading_italic",
  ...Array.from({ length: 4 }, (_, i) => [
    `focus_${i + 1}_title`,
    `focus_${i + 1}_desc`,
    `focus_${i + 1}_img`,
  ]).flat(),
];

const HOME_VALUES_KEYS = [
  "home_values_tag",
  "home_values_heading",
  "home_values_heading_italic",
  "home_values_subtext",
  "home_values_cta",
  ...Array.from({ length: 5 }, (_, i) => [`value_${i + 1}_title`, `value_${i + 1}_desc`]).flat(),
];

const HOME_CTA_KEYS = [
  "home_cta_tag",
  "home_cta_heading",
  "home_cta_heading_italic",
  "home_cta_body",
  "home_cta_btn1",
  "home_cta_btn2",
  "img_cta_bg",
];

const STAT_KEYS = [
  "stat_1_value", "stat_1_label",
  "stat_2_value", "stat_2_label",
  "stat_3_value", "stat_3_label",
  "stat_4_value", "stat_4_label",
];

const ALL_KEYS = [
  ...ABOUT_PAGE_KEYS,
  ...HOME_ABOUT_KEYS,
  ...HOME_WHATWEDO_KEYS,
  ...HOME_VALUES_KEYS,
  ...HOME_CTA_KEYS,
  ...STAT_KEYS,
];

// ─── Labels ─────────────────────────────────────────────────────────────────

const LABELS: Record<string, string> = {
  about_paragraph_1: "About Paragraph 1",
  about_paragraph_2: "About Paragraph 2",
  about_paragraph_3: "About Paragraph 3",
  about_tags: "Expertise Tags (comma-separated)",
  home_about_tag: "Section Tag",
  home_about_heading: "Heading (main part)",
  home_about_heading_italic: "Heading (italic accent word)",
  home_about_p1: "Paragraph 1",
  home_about_p2: "Paragraph 2",
  home_about_badge_title: "Badge Title (e.g. Prof.)",
  home_about_badge_sub: "Badge Subtitle",
  home_about_btn: "Button Label",
  img_about: "About Section Image",
  home_whatwedo_tag: "Section Tag",
  home_whatwedo_heading: "Heading (main)",
  home_whatwedo_heading_italic: "Heading (italic accent)",
  home_values_tag: "Section Tag",
  home_values_heading: "Heading (main)",
  home_values_heading_italic: "Heading (italic accent)",
  home_values_subtext: "Subtext (right side)",
  home_values_cta: "CTA Button Label",
  home_cta_tag: "Section Tag",
  home_cta_heading: "Heading (main)",
  home_cta_heading_italic: "Heading (italic accent)",
  home_cta_body: "Body Text",
  home_cta_btn1: "Primary Button Label",
  home_cta_btn2: "Secondary Button Label",
  img_cta_bg: "CTA Background Image",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const isTextarea = (key: string) =>
  key.endsWith("_p1") || key.endsWith("_p2") || key.endsWith("_p3") ||
  key.endsWith("_body") || key.endsWith("_subtext") ||
  key.endsWith("_desc") || key === "home_about_badge_sub";

const isTags = (key: string) => key === "about_tags";
const isImage = (key: string) => key.startsWith("img_") || key.endsWith("_img");

// ─── Image Upload Field ───────────────────────────────────────────────────────

interface ImageUploadFieldProps {
  label: string;
  keyName: string;
  value: string;
  onChange: (key: string, val: string) => void;
}

const ImageUploadField = ({ label, keyName, value, onChange }: ImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError(null);
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `content/${keyName}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("site-media")
      .upload(path, file, { upsert: true });
    if (upErr) {
      setError(upErr.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    onChange(keyName, data.publicUrl);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="font-body text-sm font-semibold text-foreground block mb-2">{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative rounded-2xl border-2 border-dashed border-border bg-muted/30 overflow-hidden transition-colors hover:border-accent/50"
      >
        {value ? (
          <div className="relative group">
            <img src={value} alt="Preview" className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-2 bg-accent text-foreground font-body text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Upload size={14} /> Replace Image
              </button>
              <button
                onClick={() => onChange(keyName, "")}
                className="flex items-center gap-2 bg-white/20 text-white font-body text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
              >
                <X size={14} /> Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full h-36 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-accent transition-colors"
          >
            {uploading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <ImageIcon size={24} />
            )}
            <span className="font-body text-sm">{uploading ? "Uploading…" : "Click or drag & drop to upload"}</span>
          </button>
        )}
        {uploading && value && (
          <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
            <Loader2 size={28} className="animate-spin text-white" />
          </div>
        )}
      </div>
      {error && <p className="font-body text-xs text-red-500 mt-1">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
      />
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Section = ({ title, description, children, defaultOpen = false }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card rounded-2xl border border-border mb-5 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
      >
        <div className="text-left">
          <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
          <p className="font-body text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        {open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      {open && <div className="px-6 pb-6 pt-2 border-t border-border space-y-5">{children}</div>}
    </div>
  );
};

interface FieldProps {
  label: string;
  keyName: string;
  value: string;
  onChange: (key: string, val: string) => void;
  placeholder?: string;
}

const Field = ({ label, keyName, value, onChange, placeholder }: FieldProps) => {
  if (isImage(keyName)) {
    return <ImageUploadField label={label} keyName={keyName} value={value} onChange={onChange} />;
  }

  if (isTags(keyName)) {
    return (
      <div>
        <label className="font-body text-sm font-semibold text-foreground block mb-2">{label}</label>
        <input
          value={value}
          onChange={(e) => onChange(keyName, e.target.value)}
          placeholder="e.g. Data-Driven, SBCC, RC&CE"
          className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="font-body text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <Info size={11} /> Separate tags with commas.
        </p>
        {value && (
          <div className="flex flex-wrap gap-2 mt-3">
            {value.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
              <span key={tag} className="font-body text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isTextarea(keyName)) {
    return (
      <div>
        <label className="font-body text-sm font-semibold text-foreground block mb-2">{label}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(keyName, e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="font-body text-sm font-semibold text-foreground block mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(keyName, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const AdminContent = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ALL_KEYS);
      const map: Record<string, string> = {};
      data?.forEach((row) => { map[row.key] = row.value ?? ""; });
      setSettings(map);
      setLoading(false);
    };
    load();
  }, []);

  const set = (key: string, value: string) =>
    setSettings((p) => ({ ...p, [key]: value }));

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

  const s = (key: string) => settings[key] ?? "";
  const f = (key: string, placeholder?: string) => (
    <Field key={key} keyName={key} label={LABELS[key] ?? key} value={s(key)} onChange={set} placeholder={placeholder} />
  );

  if (loading) return (
    <div className="p-8 flex justify-center py-24">
      <Loader2 size={28} className="animate-spin text-accent" />
    </div>
  );

  const stats = [
    { valueKey: "stat_1_value", labelKey: "stat_1_label", num: "01" },
    { valueKey: "stat_2_value", labelKey: "stat_2_label", num: "02" },
    { valueKey: "stat_3_value", labelKey: "stat_3_label", num: "03" },
    { valueKey: "stat_4_value", labelKey: "stat_4_label", num: "04" },
  ];

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Content Editor</h1>
        <p className="font-body text-muted-foreground mt-1">Edit every piece of content and image across the site — headings, tags, body text, CTAs and more.</p>
      </div>

      {/* ── About Page ─────────────────────────────────────────── */}
      <Section title="About Page" description="Biography paragraphs and expertise tags shown on the About page." defaultOpen>
        {ABOUT_PAGE_KEYS.map((k) => f(k))}
      </Section>

      {/* ── Homepage — About Teaser ────────────────────────────── */}
      <Section title="Homepage — About Teaser" description="The 'Who We Are' split section on the homepage.">
        {f("img_about")}
        {f("home_about_tag")}
        <div className="grid sm:grid-cols-2 gap-4">
          {f("home_about_heading", "e.g. Practice beyond")}
          {f("home_about_heading_italic", "e.g. classroom")}
        </div>
        {f("home_about_p1")}
        {f("home_about_p2")}
        <div className="grid sm:grid-cols-2 gap-4">
          {f("home_about_badge_title", "e.g. Prof.")}
          {f("home_about_badge_sub", "e.g. Founded by Abigail Ogwezzy-Ndisika")}
        </div>
        {f("home_about_btn", "e.g. Learn More")}
        {(s("home_about_heading") || s("home_about_heading_italic")) && (
          <div className="bg-muted/40 rounded-xl px-5 py-4 border border-border">
            <p className="font-body text-xs text-muted-foreground mb-1">Heading preview</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {s("home_about_heading")} <em className="text-accent" style={{ fontStyle: "italic" }}>{s("home_about_heading_italic")}</em>
            </p>
          </div>
        )}
      </Section>

      {/* ── Homepage — What We Do ───────────────────────────────── */}
      <Section title="Homepage — What We Do" description="Section header and the four focus area cards with images.">
        {f("home_whatwedo_tag")}
        <div className="grid sm:grid-cols-2 gap-4">
          {f("home_whatwedo_heading", "e.g. Areas")}
          {f("home_whatwedo_heading_italic", "e.g. we work on")}
        </div>
        <div className="border-t border-border pt-5">
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Focus Area Cards</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-muted/40 rounded-xl p-4 border border-border space-y-3">
                <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-widest">Area {String(n).padStart(2, "0")}</p>
                <Field keyName={`focus_${n}_img`} label="Image" value={s(`focus_${n}_img`)} onChange={set} />
                <Field keyName={`focus_${n}_title`} label="Title" value={s(`focus_${n}_title`)} onChange={set} placeholder="e.g. Data-Driven Insights" />
                <Field keyName={`focus_${n}_desc`} label="Description" value={s(`focus_${n}_desc`)} onChange={set} placeholder="Short description…" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Homepage — Values Section ───────────────────────────── */}
      <Section title="Homepage — Values Section" description="The dark section showcasing MADE-F's six core values.">
        {f("home_values_tag")}
        <div className="grid sm:grid-cols-2 gap-4">
          {f("home_values_heading", "e.g. Our core")}
          {f("home_values_heading_italic", "e.g. values")}
        </div>
        {f("home_values_subtext")}
        {f("home_values_cta", "e.g. Explore Our Values")}
        <div className="border-t border-border pt-5">
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Values Cards</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="bg-muted/40 rounded-xl p-4 border border-border space-y-3">
                <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-widest">Value {String(n).padStart(2, "0")}</p>
                <Field keyName={`value_${n}_title`} label="Title" value={s(`value_${n}_title`)} onChange={set} placeholder="e.g. Integrity" />
                <Field keyName={`value_${n}_desc`} label="Description" value={s(`value_${n}_desc`)} onChange={set} placeholder="Short description…" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Homepage — CTA Banner ──────────────────────────────── */}
      <Section title="Homepage — CTA Banner" description="The 'Get Involved' call-to-action banner with background image.">
        {f("img_cta_bg")}
        {f("home_cta_tag")}
        <div className="grid sm:grid-cols-2 gap-4">
          {f("home_cta_heading", "e.g. Join us in building")}
          {f("home_cta_heading_italic", "e.g. informed communities")}
        </div>
        {f("home_cta_body")}
        <div className="grid sm:grid-cols-2 gap-4">
          {f("home_cta_btn1", "e.g. Contact Us")}
          {f("home_cta_btn2", "e.g. Learn More")}
        </div>
        {(s("home_cta_heading") || s("home_cta_heading_italic")) && (
          <div className="bg-primary rounded-xl px-5 py-4 border border-border">
            <p className="font-body text-xs text-primary-foreground/50 mb-1">Heading preview</p>
            <p className="font-display text-2xl font-bold text-primary-foreground">
              {s("home_cta_heading")}<br />
              <em style={{ fontStyle: "italic", color: "hsl(var(--accent))" }}>{s("home_cta_heading_italic")}</em>
            </p>
          </div>
        )}
      </Section>

      {/* ── Impact Statistics ─────────────────────────────────── */}
      <Section title="Impact Statistics" description="The 4 stat cards shown in the hero section.">
        <div className="grid sm:grid-cols-2 gap-5">
          {stats.map((s_) => (
            <div key={s_.num} className="bg-muted/40 rounded-xl p-4 border border-border">
              <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Stat {s_.num}
              </p>
              <div className="space-y-3">
                <div>
                  <label className="font-body text-xs font-medium text-foreground block mb-1">Value</label>
                  <input
                    value={settings[s_.valueKey] ?? ""}
                    onChange={(e) => set(s_.valueKey, e.target.value)}
                    placeholder="e.g. 5+, 2024, SBCC"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-display font-bold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-medium text-foreground block mb-1">Label</label>
                  <input
                    value={settings[s_.labelKey] ?? ""}
                    onChange={(e) => set(s_.labelKey, e.target.value)}
                    placeholder="e.g. Years of Impact"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="bg-primary rounded-lg px-4 py-2 text-center">
                  <p className="font-display text-xl font-bold text-primary-foreground">
                    {settings[s_.valueKey] || "Value"}
                  </p>
                  <p className="font-body text-xs text-primary-foreground/70">
                    {settings[s_.labelKey] || "Label"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="flex justify-end mt-2">
        <button onClick={handleSave} disabled={saving} className="btn-gold gap-2">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AdminContent;
