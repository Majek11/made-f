import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, Trash2, Loader2, Copy, Check } from "lucide-react";

interface MediaFile {
  id: string;
  file_url: string;
  file_name: string;
  alt_text: string | null;
  created_at: string;
}

const AdminMedia = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    const { data } = await supabase
      .from("media_uploads")
      .select("*")
      .order("created_at", { ascending: false });
    setFiles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: upErr } = await supabase.storage.from("site-media").upload(path, file);
    if (upErr) { setUploading(false); return; }

    const { data: urlData } = supabase.storage.from("site-media").getPublicUrl(path);

    await supabase.from("media_uploads").insert({
      file_url: urlData.publicUrl,
      file_name: file.name,
      bucket_path: path,
      uploaded_by: user.id,
    });

    setUploading(false);
    fetchFiles();
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete "${file.file_name}"?`)) return;
    await supabase.storage.from("site-media").remove([file.file_url.split("/site-media/")[1]]);
    await supabase.from("media_uploads").delete().eq("id", file.id);
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  const copyUrl = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Media Library</h1>
          <p className="font-body text-muted-foreground mt-1">Upload and manage images, logos, and media files.</p>
        </div>
        <label className="btn-gold cursor-pointer">
          {uploading ? (
            <><Loader2 size={16} className="animate-spin" /> Uploading…</>
          ) : (
            <><Upload size={16} /> Upload File</>
          )}
          <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-primary" />
        </div>
      ) : files.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-2xl p-16 text-center">
          <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-body text-muted-foreground">No files yet. Upload your first file above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.id} className="bg-card rounded-2xl border border-border overflow-hidden group">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img
                  src={file.file_url}
                  alt={file.alt_text || file.file_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(file.file_url, file.id)}
                    className="p-2 rounded-lg bg-white/90 text-foreground hover:bg-white transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === file.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(file)}
                    className="p-2 rounded-lg bg-destructive/90 text-destructive-foreground hover:bg-destructive transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-body text-xs text-foreground truncate font-medium">{file.file_name}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
