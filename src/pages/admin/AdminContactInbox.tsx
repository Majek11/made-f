import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Mail, MailOpen, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface Submission {
  id: string;
  name: string;
  email: string;
  organisation: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminContactInbox = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetch = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubmissions((data as Submission[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const markRead = async (s: Submission) => {
    if (!s.is_read) {
      await supabase.from("contact_submissions").update({ is_read: true }).eq("id", s.id);
    }
    setSelected(s);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    toast({ title: "Submission deleted" });
    setSelected(null);
    fetch();
  };

  const unreadCount = submissions.filter((s) => !s.is_read).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Contact Inbox</h1>
          <p className="font-body text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All messages read"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={28} className="animate-spin text-primary" />
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16">
          <Mail size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="font-body text-muted-foreground">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {submissions.map((s) => (
            <div
              key={s.id}
              onClick={() => markRead(s)}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                s.is_read
                  ? "bg-card border-border hover:bg-muted/50"
                  : "bg-accent/5 border-accent/20 hover:bg-accent/10"
              }`}
            >
              {s.is_read ? (
                <MailOpen size={18} className="text-muted-foreground flex-shrink-0" />
              ) : (
                <Mail size={18} className="text-primary flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-display truncate ${s.is_read ? "text-foreground" : "font-bold text-foreground"}`}>
                    {s.name}
                  </p>
                  {s.organisation && (
                    <span className="text-xs text-muted-foreground font-body">• {s.organisation}</span>
                  )}
                </div>
                <p className="font-body text-sm text-muted-foreground truncate">{s.message}</p>
              </div>
              <span className="font-body text-xs text-muted-foreground flex-shrink-0">
                {format(new Date(s.created_at), "MMM d, yyyy")}
              </span>
              <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(s.id); }}>
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message from {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <a href={`mailto:${selected.email}`} className="font-body text-sm text-primary hover:underline">{selected.email}</a>
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Organisation</p>
                  <p className="font-body text-sm text-foreground">{selected.organisation || "—"}</p>
                </div>
              </div>
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">Message</p>
                <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div>
                <p className="font-body text-xs text-muted-foreground">
                  Received: {format(new Date(selected.created_at), "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selected.email}?subject=Re: Contact from MADE-F website`}>Reply via Email</a>
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(selected.id)}>
                  <Trash2 size={14} /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactInbox;
