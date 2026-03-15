import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services as initialServices } from "@/data/content";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";

interface Service { id: string; title: string; short: string; description: string; technologies: string[]; icon: string; }
const empty: Service = { id: "", title: "", short: "", description: "", technologies: [], icon: "code" };

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Service>(empty);
  const [deleteTarget, setDeleteTarget] = useState("");
  const [techInput, setTechInput] = useState("");

  const openCreate = () => { setEditing({ ...empty, id: `svc-${Date.now()}` }); setTechInput(""); setDialogOpen(true); };
  const openEdit = (s: Service) => { setEditing({ ...s }); setTechInput(s.technologies.join(", ")); setDialogOpen(true); };

  const handleSave = () => {
    const item = { ...editing, technologies: techInput.split(",").map((t) => t.trim()).filter(Boolean) };
    const exists = items.find((s) => s.id === item.id);
    if (exists) { setItems(items.map((s) => (s.id === item.id ? item : s))); toast.success("Service updated"); }
    else { setItems([item, ...items]); toast.success("Service created"); }
  };

  const handleDelete = () => { setItems(items.filter((s) => s.id !== deleteTarget)); toast.success("Service deleted"); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage the services you offer.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Add Service</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((service, i) => (
          <motion.div key={service.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.short}</p>
                <div className="flex gap-1 mt-3 flex-wrap">
                  {service.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-[11px] font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => openEdit(service)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
                  <Button variant="ghost" size="sm" className="text-xs h-8 text-muted-foreground hover:text-destructive" onClick={() => { setDeleteTarget(service.id); setDeleteOpen(true); }}>
                    <Trash2 className="h-3 w-3 mr-1" />Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AdminFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={items.find((s) => s.id === editing.id) ? "Edit Service" : "New Service"} onSubmit={handleSave}>
        <div><label className="text-sm font-medium text-foreground">Title</label><Input className="mt-1.5" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Short Description</label><Input className="mt-1.5" value={editing.short} onChange={(e) => setEditing({ ...editing, short: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Full Description</label><Textarea className="mt-1.5" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Technologies (comma separated)</label><Input className="mt-1.5" value={techInput} onChange={(e) => setTechInput(e.target.value)} /></div>
      </AdminFormDialog>

      <AdminFormDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Service" onSubmit={handleDelete} submitLabel="Delete" destructive>
        <p className="text-sm text-muted-foreground">Are you sure you want to delete this service?</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminServices;
