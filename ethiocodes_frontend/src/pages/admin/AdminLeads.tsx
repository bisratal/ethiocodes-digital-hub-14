import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, Filter, ChevronDown, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  message?: string;
  project_description?: string;
  budget: string;
  timeline?: string;
  type: string;
  status: string;
  internal_notes?: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  New: "bg-secondary/15 text-secondary",
  Contacted: "bg-primary/10 text-primary",
  Converted: "bg-green-500/15 text-green-600",
  Archived: "bg-gray-500/15 text-gray-600",
};

const statuses = ["New", "Contacted", "Converted", "Archived"];

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch leads from API
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leads");
      // Handle different API response structures
      let leadsData = [];
      if (res.data?.leads && Array.isArray(res.data.leads)) {
        leadsData = res.data.leads;
      } else if (Array.isArray(res.data)) {
        leadsData = res.data;
      }
      setLeads(leadsData);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = filterStatus === "All" 
    ? leads 
    : leads.filter((l) => l.status === filterStatus);

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdatingStatus(id);
    try {
      const response = await api.put(`/leads/${id}`, { status: newStatus });
      setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      toast.success(`Status updated to ${newStatus}`);
    } catch (err: any) {
      console.error("Failed to update status:", err);
      toast.error(err.response?.data?.error || "Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/leads/${deleteTarget}`);
      setLeads(leads.filter((l) => l.id !== deleteTarget));
      toast.success("Lead deleted successfully");
      setDeleteOpen(false);
      setDeleteTarget(-1);
    } catch (err: any) {
      console.error("Failed to delete lead:", err);
      toast.error(err.response?.data?.error || "Failed to delete lead");
    } finally {
      setDeleting(false);
    }
  };

  const viewDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  // Calculate stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leads</h1>
            <p className="text-sm text-muted-foreground mt-1">Track and manage project inquiries.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border border-border shadow-none">
              <CardContent className="p-4 text-center">
                <div className="animate-pulse">
                  <div className="h-7 w-12 bg-muted rounded mx-auto mb-1"></div>
                  <div className="h-3 w-16 bg-muted rounded mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-border shadow-none">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading leads...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage project inquiries.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-medium">
              <Filter className="h-4 w-4 mr-2" /> {filterStatus} <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("All")}>All</DropdownMenuItem>
            {statuses.map((s) => (
              <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)}>{s}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border border-border shadow-none">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{totalLeads}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-secondary">{newLeads}</p>
            <p className="text-xs text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{contactedLeads}</p>
            <p className="text-xs text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{convertedLeads}</p>
            <p className="text-xs text-muted-foreground">Converted</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card className="border border-border shadow-none">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              {filterStatus !== "All" 
                ? `No leads with status "${filterStatus}".` 
                : "No leads yet. Submit a contact form or project request to see leads here."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Project</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Type</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                   </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td
                        className="px-5 py-3.5 cursor-pointer"
                        onClick={() => viewDetail(lead)}
                      >
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                        {lead.company && (
                          <p className="text-xs text-muted-foreground/60">{lead.company}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
                        {lead.project_description?.substring(0, 40) || lead.message?.substring(0, 40) || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">
                        <span className="capitalize">{lead.type?.toLowerCase() || "Contact"}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${statusColors[lead.status]}`}
                              disabled={updatingStatus === lead.id}
                            >
                              {updatingStatus === lead.id ? (
                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              ) : (
                                lead.status
                              )}
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {statuses.map((s) => (
                              <DropdownMenuItem
                                key={s}
                                onClick={() => updateStatus(lead.id, s)}
                                disabled={updatingStatus === lead.id}
                              >
                                {s}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => {
                              window.open(`mailto:${lead.email}?subject=Regarding your inquiry about ${lead.project_description || "your project"}`);
                            }}
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => {
                              setDeleteTarget(lead.id);
                              setDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <AdminFormDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        title="Lead Details"
        onSubmit={() => setDetailOpen(false)}
        submitLabel="Close"
      >
        {selectedLead && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-muted-foreground">Name</span>
                <p className="font-medium text-foreground">{selectedLead.name}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Email</span>
                <p className="text-foreground break-all">{selectedLead.email}</p>
              </div>
            </div>
            {selectedLead.company && (
              <div>
                <span className="text-xs text-muted-foreground">Company</span>
                <p className="text-foreground">{selectedLead.company}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-muted-foreground">Type</span>
                <p className="text-foreground capitalize">{selectedLead.type?.toLowerCase()}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Status</span>
                <p className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedLead.status]}`}>
                  {selectedLead.status}
                </p>
              </div>
            </div>
            {selectedLead.project_description && (
              <div>
                <span className="text-xs text-muted-foreground">Project Description</span>
                <p className="text-foreground text-sm mt-1 whitespace-pre-wrap">
                  {selectedLead.project_description}
                </p>
              </div>
            )}
            {selectedLead.message && (
              <div>
                <span className="text-xs text-muted-foreground">Message</span>
                <p className="text-foreground text-sm mt-1 whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {selectedLead.budget && (
                <div>
                  <span className="text-xs text-muted-foreground">Budget</span>
                  <p className="text-foreground">{selectedLead.budget}</p>
                </div>
              )}
              {selectedLead.timeline && (
                <div>
                  <span className="text-xs text-muted-foreground">Timeline</span>
                  <p className="text-foreground">{selectedLead.timeline}</p>
                </div>
              )}
            </div>
            {selectedLead.internal_notes && (
              <div>
                <span className="text-xs text-muted-foreground">Internal Notes</span>
                <p className="text-foreground text-sm mt-1 whitespace-pre-wrap bg-muted/30 p-2 rounded">
                  {selectedLead.internal_notes}
                </p>
              </div>
            )}
            <div>
              <span className="text-xs text-muted-foreground">Received</span>
              <p className="text-foreground text-sm">
                {formatDate(selectedLead.created_at)} ({formatTimeAgo(selectedLead.created_at)})
              </p>
            </div>
          </div>
        )}
      </AdminFormDialog>

      {/* Delete Confirm Dialog */}
      <AdminFormDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Lead"
        onSubmit={handleDelete}
        submitLabel={deleting ? "Deleting..." : "Delete"}
        destructive
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this lead? This action cannot be undone.
        </p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminLeads;