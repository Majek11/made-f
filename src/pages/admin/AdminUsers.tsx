import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Loader2, Shield, Trash2, Mail } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  role: "admin" | "editor" | null;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "editor">("editor");
  const [inviting, setInviting] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // Fetch profiles
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name, created_at")
      .order("created_at");

    // Fetch roles
    const { data: roles } = await supabase
      .from("user_roles")
      .select("user_id, role");

    const roleMap: Record<string, "admin" | "editor"> = {};
    roles?.forEach((r) => { roleMap[r.user_id] = r.role as "admin" | "editor"; });

    setUsers(
      (profiles ?? []).map((p) => ({
        ...p,
        role: roleMap[p.id] ?? null,
      }))
    );
    setLoading(false);
  };

  const handleInvite = async () => {
    const email = inviteEmail.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInviteMsg({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    setInviting(true);
    setInviteMsg(null);

    const { data, error } = await supabase.functions.invoke("invite-user", {
      body: { email, role: inviteRole },
    });

    if (error || data?.error) {
      setInviteMsg({ type: "error", text: data?.error ?? error?.message ?? "Failed to invite user." });
    } else {
      setInviteMsg({ type: "success", text: `Invitation sent to ${email}!` });
      setInviteEmail("");
      setTimeout(() => fetchUsers(), 1500);
    }
    setInviting(false);
    setTimeout(() => setInviteMsg(null), 5000);
  };

  const handleRoleChange = async (userId: string, newRole: "admin" | "editor" | "remove") => {
    setUpdatingRole(userId);
    if (newRole === "remove") {
      await supabase.from("user_roles").delete().eq("user_id", userId);
    } else {
      // Upsert role
      await supabase.from("user_roles").delete().eq("user_id", userId);
      await supabase.from("user_roles").insert({ user_id: userId, role: newRole });
    }
    await fetchUsers();
    setUpdatingRole(null);
  };

  const roleBadge = (role: string | null) => {
    if (!role) return <span className="text-xs font-body text-muted-foreground">No role</span>;
    return (
      <span className={`text-xs font-body font-semibold px-2 py-0.5 rounded-full ${
        role === "admin"
          ? "bg-primary/10 text-primary"
          : "bg-accent/20 text-foreground"
      }`}>
        {role}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">User Management</h1>
        <p className="font-body text-muted-foreground mt-1">
          Invite new admins or editors and manage existing user roles.
        </p>
      </div>

      {/* Invite panel */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-8">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <UserPlus size={18} /> Invite New User
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInvite()}
            type="email"
            placeholder="colleague@example.com"
            className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as "admin" | "editor")}
            className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleInvite}
            disabled={inviting || !inviteEmail.trim()}
            className="btn-gold gap-2 whitespace-nowrap"
          >
            {inviting ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
            Send Invite
          </button>
        </div>
        {inviteMsg && (
          <p className={`mt-3 text-sm font-body ${inviteMsg.type === "success" ? "text-green-600" : "text-destructive"}`}>
            {inviteMsg.text}
          </p>
        )}
        <p className="mt-3 text-xs font-body text-muted-foreground">
          The user will receive a magic link to set their password and access the admin dashboard.
        </p>
      </div>

      {/* Users table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Shield size={16} className="text-primary" />
          <h2 className="font-display text-base font-semibold text-foreground">
            All Users ({users.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-body text-sm">
            No users found.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm flex-shrink-0">
                  {(u.full_name ?? u.email)[0]?.toUpperCase() ?? "U"}
                </div>
                <div className="flex-1 min-w-0">
                  {u.full_name && (
                    <p className="font-body text-sm font-semibold text-foreground truncate">{u.full_name}</p>
                  )}
                  <p className="font-body text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  {roleBadge(u.role)}
                  {updatingRole === u.id ? (
                    <Loader2 size={14} className="animate-spin text-muted-foreground" />
                  ) : (
                    <select
                      value={u.role ?? ""}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as "admin" | "editor" | "remove")}
                      className="text-xs font-body px-2 py-1.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">No role</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                      <option value="remove">Remove role</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
