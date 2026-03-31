import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";
import api from "@/lib/api";

interface Member {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo_id: number | null;
  photo?: {
    id: number;
    url: string;
    name: string;
  };
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
  };
  status: boolean;
  created_at: string;
  updated_at: string;
}

const empty: Member = {
  id: 0,
  name: "",
  role: "",
  bio: "",
  photo_id: null,
  status: true,
  created_at: "",
  updated_at: "",
};

const AdminTeam = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Member>(empty);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    linkedin: "",
    github: "",
    dribbble: "",
  });

  // Fetch team members from API
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/team");
      // Handle different API response structures
      let membersData = [];
      if (Array.isArray(res.data)) {
        membersData = res.data;
      } else if (res.data?.members && Array.isArray(res.data.members)) {
        membersData = res.data.members;
      }
      setMembers(membersData);
    } catch (err) {
      console.error("Failed to fetch team members:", err);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreate = () => {
    setEditing({ ...empty, id: 0 });
    setSocialLinks({ twitter: "", linkedin: "", github: "", dribbble: "" });
    setDialogOpen(true);
  };

  const openEdit = (member: Member) => {
    setEditing({ ...member });
    setSocialLinks({
      twitter: member.social_links?.twitter || "",
      linkedin: member.social_links?.linkedin || "",
      github: member.social_links?.github || "",
      dribbble: member.social_links?.dribbble || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editing.name || !editing.role) {
      toast.error("Please fill in name and role");
      return;
    }

    setSaving(true);
    try {
      const memberData = {
        name: editing.name,
        role: editing.role,
        bio: editing.bio,
        social_links: socialLinks,
        status: true,
      };

      let response;
      if (editing.id) {
        // Update existing member
        response = await api.put(`/team/${editing.id}`, memberData);
        setMembers(members.map((m) => (m.id === editing.id ? response.data : m)));
        toast.success("Team member updated successfully");
      } else {
        // Create new member
        response = await api.post("/team", memberData);
        setMembers([response.data, ...members]);
        toast.success("Team member added successfully");
      }
      setDialogOpen(false);
      fetchMembers(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to save team member:", err);
      toast.error(err.response?.data?.error || "Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/team/${deleteTarget}`);
      setMembers(members.filter((m) => m.id !== deleteTarget));
      toast.success("Team member removed successfully");
      setDeleteOpen(false);
      setDeleteTarget(-1);
    } catch (err: any) {
      console.error("Failed to delete team member:", err);
      toast.error(err.response?.data?.error || "Failed to delete team member");
    } finally {
      setDeleting(false);
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your team roster.</p>
          </div>
          <Button className="font-semibold" disabled>
            <Plus className="h-4 w-4 mr-2" /> Add Member
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border border-border shadow-none">
              <CardContent className="p-5 text-center">
                <div className="h-16 w-16 rounded-full bg-muted animate-pulse mx-auto mb-3"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-2/3 mx-auto mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-1/2 mx-auto mb-3"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-full mb-1"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-3/4 mx-auto"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your team roster.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Member
        </Button>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No team members yet. Add your first team member!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
                <CardContent className="p-5 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto mb-3 flex items-center justify-center text-primary text-xl font-bold">
                    {member.photo ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${member.photo.url}`}
                        alt={member.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(member.name)
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
                  <p className="text-xs text-secondary font-medium">{member.role}</p>
                  {member.bio && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
                  )}
                  <div className="flex gap-2 justify-center mt-4 pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => openEdit(member)}
                    >
                      <Edit className="h-3 w-3 mr-1" />Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setDeleteTarget(member.id);
                        setDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <AdminFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing.id ? "Edit Member" : "Add Member"}
        onSubmit={handleSave}
        submitLabel={saving ? "Saving..." : editing.id ? "Update" : "Add"}
      >
        <div>
          <label className="text-sm font-medium text-foreground">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            className="mt-1.5"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Role <span className="text-red-500">*</span>
          </label>
          <Input
            className="mt-1.5"
            value={editing.role}
            onChange={(e) => setEditing({ ...editing, role: e.target.value })}
            placeholder="e.g., Lead Developer, UI/UX Designer"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Bio</label>
          <Textarea
            className="mt-1.5"
            rows={3}
            value={editing.bio}
            onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
            placeholder="Short biography about the team member..."
          />
        </div>
        
        {/* Social Links Section */}
        <div className="pt-2">
          <label className="text-sm font-medium text-foreground">Social Links (Optional)</label>
          <div className="space-y-2 mt-2">
            <div className="flex gap-2">
              <span className="text-xs text-muted-foreground w-16 pt-2">Twitter:</span>
              <Input
                className="flex-1"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                placeholder="https://twitter.com/username"
              />
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-muted-foreground w-16 pt-2">LinkedIn:</span>
              <Input
                className="flex-1"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-muted-foreground w-16 pt-2">GitHub:</span>
              <Input
                className="flex-1"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                placeholder="https://github.com/username"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Tip: Add a profile photo from the Media Library
          </p>
        </div>
      </AdminFormDialog>

      {/* Delete Confirm Dialog */}
      <AdminFormDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Remove Member"
        onSubmit={handleDelete}
        submitLabel={deleting ? "Removing..." : "Remove"}
        destructive
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to remove this team member? This action cannot be undone.
        </p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminTeam;