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

interface Service {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_id: number | null;
  image?: {
    id: number;
    url: string;
    name: string;
  };
  status: boolean;
  created_at: string;
  updated_at: string;
}

const empty: Service = {
  id: 0,
  title: "",
  description: "",
  technologies: [],
  image_id: null,
  status: true,
  created_at: "",
  updated_at: "",
};

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Service>(empty);
  const [deleteTarget, setDeleteTarget] = useState<number>(0);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services");
      // Handle different API response structures
      let servicesData = [];
      if (Array.isArray(res.data)) {
        servicesData = res.data;
      } else if (res.data?.services && Array.isArray(res.data.services)) {
        servicesData = res.data.services;
      }
      setItems(servicesData);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditing({ ...empty, id: 0 });
    setTechInput("");
    setDialogOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing({ ...s });
    setTechInput(s.technologies?.join(", ") || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editing.title || !editing.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const serviceData = {
        title: editing.title,
        description: editing.description,
        technologies: techInput.split(",").map((t) => t.trim()).filter(Boolean),
        status: true,
      };

      let response;
      if (editing.id) {
        // Update existing service
        response = await api.put(`/services/${editing.id}`, serviceData);
        setItems(items.map((s) => (s.id === editing.id ? response.data : s)));
        toast.success("Service updated successfully");
      } else {
        // Create new service
        response = await api.post("/services", serviceData);
        setItems([response.data, ...items]);
        toast.success("Service created successfully");
      }
      setDialogOpen(false);
      fetchServices(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to save service:", err);
      toast.error(err.response?.data?.error || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/services/${deleteTarget}`);
      setItems(items.filter((s) => s.id !== deleteTarget));
      toast.success("Service deleted successfully");
      setDeleteOpen(false);
      setDeleteTarget(0);
    } catch (err: any) {
      console.error("Failed to delete service:", err);
      toast.error(err.response?.data?.error || "Failed to delete service");
    } finally {
      setDeleting(false);
    }
  };

  // Get short description (first 100 characters)
  const getShortDescription = (description: string) => {
    if (!description) return "";
    return description.length > 100 ? description.substring(0, 100) + "..." : description;
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Services</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage the services you offer.</p>
          </div>
          <Button className="font-semibold" disabled>
            <Plus className="h-4 w-4 mr-2" /> Add Service
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border border-border shadow-none">
              <CardContent className="p-5">
                <div className="h-5 bg-muted rounded animate-pulse w-2/3 mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-full mb-1"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="flex gap-1 mt-3">
                  <div className="h-5 bg-muted rounded animate-pulse w-12"></div>
                  <div className="h-5 bg-muted rounded animate-pulse w-12"></div>
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
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage the services you offer.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No services yet. Create your first service!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {getShortDescription(service.description)}
                  </p>
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="flex gap-1 mt-3 flex-wrap">
                      {service.technologies.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-[11px] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                      {service.technologies.length > 4 && (
                        <span className="text-[11px] text-muted-foreground">
                          +{service.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => openEdit(service)}
                    >
                      <Edit className="h-3 w-3 mr-1" />Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setDeleteTarget(service.id);
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
        title={editing.id ? "Edit Service" : "New Service"}
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
            placeholder="Enter service title"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Full Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            className="mt-1.5"
            rows={4}
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            placeholder="Describe the service in detail..."
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
            placeholder="React, Node.js, Python, AWS"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Example: React, Node.js, MongoDB, AWS
          </p>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          <p>💡 Tip: Add an image to your service from the Media Library</p>
          <p>📸 After creating, you can add a service icon/image in the Media Library</p>
        </div>
      </AdminFormDialog>

      {/* Delete Confirm Dialog */}
      <AdminFormDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Service"
        onSubmit={handleDelete}
        submitLabel={deleting ? "Deleting..." : "Delete"}
        destructive
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this service? This action cannot be undone.
        </p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminServices;