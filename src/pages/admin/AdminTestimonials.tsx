import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { testimonials as initialTestimonials } from "@/data/content";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";

interface Testimonial { name: string; company: string; quote: string; photo: string; }
const empty: Testimonial = { name: "", company: "", quote: "", photo: "" };

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial>(empty);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);

  const openCreate = () => { setEditing({ ...empty }); setEditingIndex(null); setDialogOpen(true); };
  const openEdit = (t: Testimonial, i: number) => { setEditing({ ...t }); setEditingIndex(i); setDialogOpen(true); };

  const handleSave = () => {
    if (editingIndex !== null) { setItems(items.map((t, i) => (i === editingIndex ? editing : t))); toast.success("Testimonial updated"); }
    else { setItems([editing, ...items]); toast.success("Testimonial added"); }
  };

  const handleDelete = () => { setItems(items.filter((_, i) => i !== deleteTarget)); toast.success("Testimonial deleted"); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage client testimonials.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Add Testimonial</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((t, i) => (
          <motion.div key={`${t.name}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
              <CardContent className="p-5">
                <Quote className="h-5 w-5 text-secondary/40 mb-2" />
                <p className="text-sm text-muted-foreground italic line-clamp-3">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">{t.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => openEdit(t, i)}><Edit className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => { setDeleteTarget(i); setDeleteOpen(true); }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AdminFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingIndex !== null ? "Edit Testimonial" : "Add Testimonial"} onSubmit={handleSave}>
        <div><label className="text-sm font-medium text-foreground">Name</label><Input className="mt-1.5" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Company</label><Input className="mt-1.5" value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Quote</label><Textarea className="mt-1.5" rows={3} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></div>
      </AdminFormDialog>

      <AdminFormDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Testimonial" onSubmit={handleDelete} submitLabel="Delete" destructive>
        <p className="text-sm text-muted-foreground">Are you sure you want to delete this testimonial?</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminTestimonials;
