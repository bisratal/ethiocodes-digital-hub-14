import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { portfolioProjects as initialProjects } from "@/data/content";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  industry: string;
  image: string;
}

const empty: Project = { id: "", title: "", description: "", technologies: [], industry: "", image: "" };

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Project>(empty);
  const [deleteTarget, setDeleteTarget] = useState("");
  const [techInput, setTechInput] = useState("");

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing({ ...empty, id: `proj-${Date.now()}` }); setTechInput(""); setDialogOpen(true); };
  const openEdit = (p: Project) => { setEditing({ ...p }); setTechInput(p.technologies.join(", ")); setDialogOpen(true); };

  const handleSave = () => {
    const item = { ...editing, technologies: techInput.split(",").map((t) => t.trim()).filter(Boolean) };
    const exists = projects.find((p) => p.id === item.id);
    if (exists) { setProjects(projects.map((p) => (p.id === item.id ? item : p))); toast.success("Project updated"); }
    else { setProjects([item, ...projects]); toast.success("Project created"); }
  };

  const handleDelete = () => { setProjects(projects.filter((p) => p.id !== deleteTarget)); toast.success("Project deleted"); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your showcase projects.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Add Project</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-10 bg-card border-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border border-border shadow-none hover:shadow-card transition-shadow group">
              <div className="h-36 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground text-sm">{project.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-medium text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={() => openEdit(project)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-destructive" onClick={() => { setDeleteTarget(project.id); setDeleteOpen(true); }}>
                    <Trash2 className="h-3 w-3 mr-1" />Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AdminFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={projects.find((p) => p.id === editing.id) ? "Edit Project" : "New Project"} onSubmit={handleSave}>
        <div><label className="text-sm font-medium text-foreground">Title</label><Input className="mt-1.5" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Description</label><Textarea className="mt-1.5" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Industry</label><Input className="mt-1.5" value={editing.industry} onChange={(e) => setEditing({ ...editing, industry: e.target.value })} /></div>
        <div><label className="text-sm font-medium text-foreground">Technologies (comma separated)</label><Input className="mt-1.5" value={techInput} onChange={(e) => setTechInput(e.target.value)} /></div>
      </AdminFormDialog>

      <AdminFormDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Project" onSubmit={handleDelete} submitLabel="Delete" destructive>
        <p className="text-sm text-muted-foreground">Are you sure you want to delete this project? This action cannot be undone.</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminPortfolio;
