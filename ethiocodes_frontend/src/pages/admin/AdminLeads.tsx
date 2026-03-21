import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, Filter, ChevronDown } from "lucide-react";
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

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  project: string;
  budget: string;
  status: string;
  date: string;
}

const initialLeads: Lead[] = [
  { id: 1, name: "John Smith", email: "john@company.com", company: "TechCo", project: "E-commerce Platform", budget: "$10K–$25K", status: "New", date: "2024-12-20" },
  { id: 2, name: "Maria Garcia", email: "maria@startup.io", company: "StartupIO", project: "Mobile App MVP", budget: "$25K–$50K", status: "Contacted", date: "2024-12-18" },
  { id: 3, name: "Ahmed Hassan", email: "ahmed@corp.com", company: "CorpGlobal", project: "Cloud Migration", budget: "$50K+", status: "In Progress", date: "2024-12-15" },
  { id: 4, name: "Emily Davis", email: "emily@agency.co", company: "AgencyCo", project: "UI/UX Redesign", budget: "$5K–$10K", status: "Completed", date: "2024-12-10" },
  { id: 5, name: "Liam Chen", email: "liam@tech.dev", company: "DevTech", project: "API Integration", budget: "$10K–$25K", status: "New", date: "2024-12-22" },
];

const statusColors: Record<string, string> = {
  New: "bg-secondary/15 text-secondary",
  Contacted: "bg-primary/10 text-primary",
  "In Progress": "bg-accent text-accent-foreground",
  Completed: "bg-muted text-muted-foreground",
};

const statuses = ["New", "Contacted", "In Progress", "Completed"];

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = filterStatus === "All" ? leads : leads.filter((l) => l.status === filterStatus);

  const updateStatus = (id: number, status: string) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success(`Status updated to ${status}`);
  };

  const handleDelete = () => { setLeads(leads.filter((l) => l.id !== deleteTarget)); toast.success("Lead deleted"); };

  const viewDetail = (lead: Lead) => { setSelectedLead(lead); setDetailOpen(true); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage project inquiries.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-medium"><Filter className="h-4 w-4 mr-2" /> {filterStatus} <ChevronDown className="h-3 w-3 ml-1" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("All")}>All</DropdownMenuItem>
            {statuses.map((s) => <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)}>{s}</DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: leads.length, bg: "bg-primary/10 text-primary" },
          { label: "New", value: leads.filter((l) => l.status === "New").length, bg: "bg-secondary/15 text-secondary" },
          { label: "In Progress", value: leads.filter((l) => l.status === "In Progress").length, bg: "bg-accent text-accent-foreground" },
          { label: "Completed", value: leads.filter((l) => l.status === "Completed").length, bg: "bg-muted text-muted-foreground" },
        ].map((s) => (
          <Card key={s.label} className="border border-border shadow-none">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-border shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Budget</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 cursor-pointer" onClick={() => viewDetail(lead)}>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                      <p className="text-xs text-muted-foreground/60">{lead.company}</p>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{lead.project}</td>
                    <td className="px-5 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">{lead.budget}</td>
                    <td className="px-5 py-3.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${statusColors[lead.status]}`}>
                            {lead.status} <ChevronDown className="h-3 w-3 ml-1" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {statuses.map((s) => <DropdownMenuItem key={s} onClick={() => updateStatus(lead.id, s)}>{s}</DropdownMenuItem>)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => { window.open(`mailto:${lead.email}`); }}>
                          <Mail className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => { setDeleteTarget(lead.id); setDeleteOpen(true); }}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No leads found.</div>}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <AdminFormDialog open={detailOpen} onOpenChange={setDetailOpen} title="Lead Details" onSubmit={() => setDetailOpen(false)} submitLabel="Close">
        {selectedLead && (
          <div className="space-y-3">
            <div><span className="text-xs text-muted-foreground">Name</span><p className="font-medium text-foreground">{selectedLead.name}</p></div>
            <div><span className="text-xs text-muted-foreground">Email</span><p className="text-foreground">{selectedLead.email}</p></div>
            <div><span className="text-xs text-muted-foreground">Company</span><p className="text-foreground">{selectedLead.company}</p></div>
            <div><span className="text-xs text-muted-foreground">Project</span><p className="text-foreground">{selectedLead.project}</p></div>
            <div><span className="text-xs text-muted-foreground">Budget</span><p className="text-foreground">{selectedLead.budget}</p></div>
            <div><span className="text-xs text-muted-foreground">Date</span><p className="text-foreground">{selectedLead.date}</p></div>
          </div>
        )}
      </AdminFormDialog>

      <AdminFormDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Lead" onSubmit={handleDelete} submitLabel="Delete" destructive>
        <p className="text-sm text-muted-foreground">Are you sure you want to delete this lead?</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminLeads;
