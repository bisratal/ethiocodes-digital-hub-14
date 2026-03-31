import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus, Quote, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";
import api from "@/lib/api";

interface Testimonial {
  id: number;
  client_name: string;
  company: string;
  quote: string;
  photo_id: number | null;
  photo?: {
    id: number;
    url: string;
    name: string;
  };
  status: boolean;
  created_at: string;
  updated_at: string;
}

const empty: Testimonial = {
  id: 0,
  client_name: "",
  company: "",
  quote: "",
  photo_id: null,
  status: true,
  created_at: "",
  updated_at: "",
};

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial>(empty);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get("/testimonials");
      // Handle different API response structures
      let testimonialsData = [];
      if (Array.isArray(res.data)) {
        testimonialsData = res.data;
      } else if (res.data?.testimonials && Array.isArray(res.data.testimonials)) {
        testimonialsData = res.data.testimonials;
      }
      setItems(testimonialsData);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreate = () => {
    setEditing({ ...empty, id: 0 });
    setDialogOpen(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing({ ...testimonial });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editing.client_name || !editing.quote) {
      toast.error("Please fill in name and quote");
      return;
    }

    setSaving(true);
    try {
      const testimonialData = {
        client_name: editing.client_name,
        company: editing.company,
        quote: editing.quote,
        status: true,
      };

      let response;
      if (editing.id) {
        // Update existing testimonial
        response = await api.put(`/testimonials/${editing.id}`, testimonialData);
        setItems(items.map((t) => (t.id === editing.id ? response.data : t)));
        toast.success("Testimonial updated successfully");
      } else {
        // Create new testimonial
        response = await api.post("/testimonials", testimonialData);
        setItems([response.data, ...items]);
        toast.success("Testimonial added successfully");
      }
      setDialogOpen(false);
      fetchTestimonials(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to save testimonial:", err);
      toast.error(err.response?.data?.error || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/testimonials/${deleteTarget}`);
      setItems(items.filter((t) => t.id !== deleteTarget));
      toast.success("Testimonial deleted successfully");
      setDeleteOpen(false);
      setDeleteTarget(-1);
    } catch (err: any) {
      console.error("Failed to delete testimonial:", err);
      toast.error(err.response?.data?.error || "Failed to delete testimonial");
    } finally {
      setDeleting(false);
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage client testimonials.</p>
          </div>
          <Button className="font-semibold" disabled>
            <Plus className="h-4 w-4 mr-2" /> Add Testimonial
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border border-border shadow-none">
              <CardContent className="p-5">
                <div className="h-5 w-5 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full mb-1"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-3"></div>
                <div className="flex items-center gap-3 mt-2 pt-2">
                  <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded animate-pulse w-24 mb-1"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
                  </div>
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
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage client testimonials.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No testimonials yet. Add your first client testimonial!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
                <CardContent className="p-5">
                  <Quote className="h-5 w-5 text-secondary/40 mb-2" />
                  <p className="text-sm text-muted-foreground italic line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                    {testimonial.photo ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${testimonial.photo.url}`}
                        alt={testimonial.client_name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary text-sm font-bold">
                        {getInitials(testimonial.client_name)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{testimonial.client_name}</p>
                      {testimonial.company && (
                        <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground"
                        onClick={() => openEdit(testimonial)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          setDeleteTarget(testimonial.id);
                          setDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
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
        title={editing.id ? "Edit Testimonial" : "Add Testimonial"}
        onSubmit={handleSave}
        submitLabel={saving ? "Saving..." : editing.id ? "Update" : "Add"}
      >
        <div>
          <label className="text-sm font-medium text-foreground">
            Client Name <span className="text-red-500">*</span>
          </label>
          <Input
            className="mt-1.5"
            value={editing.client_name}
            onChange={(e) => setEditing({ ...editing, client_name: e.target.value })}
            placeholder="Full name of the client"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Company (Optional)</label>
          <Input
            className="mt-1.5"
            value={editing.company}
            onChange={(e) => setEditing({ ...editing, company: e.target.value })}
            placeholder="Company name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Quote <span className="text-red-500">*</span>
          </label>
          <Textarea
            className="mt-1.5"
            rows={3}
            value={editing.quote}
            onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
            placeholder="What did the client say about your work?"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Maximum 500 characters
          </p>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          💡 Tip: Add a client photo from the Media Library for a better display
        </div>
      </AdminFormDialog>

      {/* Delete Confirm Dialog */}
      <AdminFormDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Testimonial"
        onSubmit={handleDelete}
        submitLabel={deleting ? "Deleting..." : "Delete"}
        destructive
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this testimonial? This action cannot be undone.
        </p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminTestimonials;