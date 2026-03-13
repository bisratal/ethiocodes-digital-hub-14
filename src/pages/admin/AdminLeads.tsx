import { motion } from "framer-motion";
import { Mail, Eye, Trash2, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const leads = [
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

const AdminLeads = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leads</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and manage project inquiries.</p>
      </div>
      <Button variant="outline" className="font-medium">
        <Filter className="h-4 w-4 mr-2" /> Filter
      </Button>
    </div>

    {/* Summary */}
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
              {leads.map((lead, i) => (
                <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                    <p className="text-xs text-muted-foreground/60">{lead.company}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{lead.project}</td>
                  <td className="px-5 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">{lead.budget}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Mail className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => toast.info("Coming with backend")}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminLeads;
