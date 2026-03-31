import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";
import api from "@/lib/api";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  client_industry: string;
  order: number;
  status: boolean;
  images?: Array<{ id: number; url: string; name: string }>;
  created_at: string;
  updated_at: string;
}

const empty: Project = {
  id: 0,
  title: "",
  description: "",
  technologies: [],
  client_industry: "",
  order: 0,
  status: true,
  created_at: "",
  updated_at: "",
};

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Project>(empty);
  const [deleteTarget, setDeleteTarget] = useState<number>(0);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch portfolio projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/portfolio");
      // Handle different API response structures
      let projectsData = [];
      if (res.data?.projects && Array.isArray(res.data.projects)) {
        projectsData = res.data.projects;
      } else if (Array.isArray(res.data)) {
        projectsData = res.data;
      }
      setProjects(projectsData);
    } catch (err) {
      console.error("Failed to fetch portfolio projects:", err);
      toast.error("Failed to load portfolio projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing({ ...empty, id: 0 });
    setTechInput("");
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing({ ...p });
    setTechInput(p.technologies?.join(", ") || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editing.title || !editing.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const projectData = {
        title: editing.title,
        description: editing.description,
        technologies: techInput.split(",").map((t) => t.trim()).filter(Boolean),
        client_industry: editing.client_industry,
        status: true,
      };

      let response;
      if (editing.id) {
        // Update existing project
        response = await api.put(`/portfolio/${editing.id}`, projectData);
        setProjects(projects.map((p) => (p.id === editing.id ? response.data : p)));
        toast.success("Project updated successfully");
      } else {
        // Create new project
        response = await api.post("/portfolio", projectData);
        setProjects([response.data, ...projects]);
        toast.success("Project created successfully");
      }
      setDialogOpen(false);
      fetchProjects(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to save project:", err);
      toast.error(err.response?.data?.error || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/portfolio/${deleteTarget}`);
      setProjects(projects.filter((p) => p.id !== deleteTarget));
      toast.success("Project deleted successfully");
      setDeleteOpen(false);
      setDeleteTarget(0);
    } catch (err: any) {
      console.error("Failed to delete project:", err);
      toast.error(err.response?.data?.error || "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your showcase projects.</p>
          </div>
          <Button className="font-semibold" disabled>
            <Plus className="h-4 w-4 mr-2" /> Add Project
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." disabled className="pl-9 h-10 bg-card border-border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border border-border shadow-none">
              <div className="h-36 bg-muted animate-pulse rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-full mb-1"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-2/3"></div>
                <div className="flex gap-1 mt-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-12"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-12"></div>
                </div>
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
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your showcase projects.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-10 bg-card border-border"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          {search ? "No projects match your search." : "No portfolio projects yet. Create your first project!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border border-border shadow-none hover:shadow-card transition-shadow group">
                <div className="h-36 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                  {project.images && project.images[0] ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${project.images[0].url}`}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <span className="text-muted-foreground/30 text-sm">No image</span>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground text-sm">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  {project.client_industry && (
                    <p className="text-[10px] text-muted-foreground/70 mt-1">
                      {project.client_industry}
                    </p>
                  )}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {(project.technologies || []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {(project.technologies || []).length > 3 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground"
                      onClick={() => openEdit(project)}
                    >
                      <Edit className="h-3 w-3 mr-1" />Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setDeleteTarget(project.id);
                        setDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />Delete
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
        title={editing.id ? "Edit Project" : "New Project"}
        onSubmit={handleSave}
        submitLabel={saving ? "Saving..." : editing.id ? "Update" : "Create"}
      >
        <div>
          <label className="text-sm font-medium text-foreground">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            className="mt-1.5"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            className="mt-1.5"
            rows={3}
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            placeholder="Describe the project..."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Industry</label>
          <Input
            className="mt-1.5"
            value={editing.client_industry}
            onChange={(e) => setEditing({ ...editing, client_industry: e.target.value })}
            placeholder="e.g., Retail, Healthcare, Finance"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Technologies (comma separated)
          </label>
          <Input
            className="mt-1.5"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="React, Node.js, MongoDB"
          />
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          <p>💡 Tip: Add images to your project from the Media Library</p>
          <p>📸 After creating, you can add project screenshots in the Media Library</p>
        </div>
      </AdminFormDialog>

      {/* Delete Confirm Dialog */}
      <AdminFormDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Project"
        onSubmit={handleDelete}
        submitLabel={deleting ? "Deleting..." : "Delete"}
        destructive
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this project? This action cannot be undone.
        </p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminPortfolio;