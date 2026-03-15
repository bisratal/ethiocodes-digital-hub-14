import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { teamMembers as initialMembers } from "@/data/content";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";

interface Member { name: string; role: string; bio: string; photo: string; }
const empty: Member = { name: "", role: "", bio: "", photo: "" };

const AdminTeam = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Member>(empty);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);

  const openCreate = () => { setEditing({ ...empty }); setEditingIndex(null); setDialogOpen(true); };
  const openEdit = (m: Member, i: number) => { setEditing({ ...m }); setEditingIndex(i); setDialogOpen(true); };

  const handleSave = () => {
    if (editingIndex !== null) {
      setMembers(members.map((m, i) => (i === editingIndex ? editing : m)));
      toast.success("Member updated");
    } else {
      setMembers([editing, ...members]);
      toast.success("Member added");
    }
  };

  const handleDelete = () => { setMembers(members.filter((_, i) => i !== deleteTarget)); toast.success("Member removed"); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your team roster.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Add Member</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, i) => (
          <motion.div key={`${member.name}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
              <CardContent className="p-5 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center text-primary text-xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
                <p className="text-xs text-secondary font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
                <div className="flex gap-2 justify-center mt-4 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => openEdit(member, i)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground hover:text-destructive" onClick={() => { setDeleteTarget(i); setDeleteOpen(true); }}>
                    <Trash2 className="h-3 w-3 mr-1" />Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AdminFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingIndex !== null ? "Edit Member" : "Add Member"} onSubmit={handleSave}>
        <div><label className="text-sm font-medium text-foreground">Name</label><Input className="mt-1.5" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Role</label><Input className="mt-1.5" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Bio</label><Textarea className="mt-1.5" rows={3} value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} /></div>
      </AdminFormDialog>

      <AdminFormDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Remove Member" onSubmit={handleDelete} submitLabel="Remove" destructive>
        <p className="text-sm text-muted-foreground">Are you sure you want to remove this team member?</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminTeam;
