import { motion } from "framer-motion";
import {
  Users, FileText, Briefcase, Mail, TrendingUp, Eye, ArrowUpRight, ArrowDownRight,
  Activity, Clock, CheckCircle2, AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts, portfolioProjects, teamMembers, testimonials } from "@/data/content";

const stats = [
  {
    title: "Total Visitors",
    value: "12,847",
    change: "+14.2%",
    trend: "up" as const,
    icon: Eye,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Active Leads",
    value: "38",
    change: "+8.1%",
    trend: "up" as const,
    icon: Mail,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "Blog Posts",
    value: String(blogPosts.length),
    change: "+2 this month",
    trend: "up" as const,
    icon: FileText,
    color: "text-accent-foreground",
    bg: "bg-accent",
  },
  {
    title: "Team Members",
    value: String(teamMembers.length),
    change: "No change",
    trend: "neutral" as const,
    icon: Users,
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
];

const recentLeads = [
  { name: "John Smith", email: "john@company.com", project: "E-commerce Platform", status: "New", date: "2 hours ago" },
  { name: "Maria Garcia", email: "maria@startup.io", project: "Mobile App", status: "Contacted", date: "5 hours ago" },
  { name: "Ahmed Hassan", email: "ahmed@corp.com", project: "Cloud Migration", status: "New", date: "1 day ago" },
  { name: "Emily Davis", email: "emily@agency.co", project: "UI/UX Redesign", status: "In Progress", date: "2 days ago" },
  { name: "Liam Chen", email: "liam@tech.dev", project: "API Integration", status: "Completed", date: "3 days ago" },
];

const recentActivity = [
  { action: "New lead submitted", detail: "John Smith — E-commerce Platform", time: "2 hours ago", icon: Mail },
  { action: "Blog post published", detail: "React Performance Optimization", time: "1 day ago", icon: FileText },
  { action: "Portfolio updated", detail: "Added FinTech Dashboard case study", time: "2 days ago", icon: Briefcase },
  { action: "Team member added", detail: "Sara Tadesse — Senior Developer", time: "1 week ago", icon: Users },
];

const statusColors: Record<string, string> = {
  New: "bg-secondary/15 text-secondary",
  Contacted: "bg-primary/10 text-primary",
  "In Progress": "bg-accent text-accent-foreground",
  Completed: "bg-muted text-muted-foreground",
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back. Here's what's happening with your site.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-9 w-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  {stat.trend === "up" && (
                    <span className="flex items-center text-xs font-medium text-emerald-600">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      {stat.change}
                    </span>
                  )}
                  {stat.trend === "neutral" && (
                    <span className="text-xs text-muted-foreground">{stat.change}</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <Card className="border border-border shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Leads</CardTitle>
                <a href="/admin/leads" className="text-xs font-medium text-primary hover:underline">
                  View all →
                </a>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Project</th>
                      <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-3">
                          <p className="font-medium text-foreground">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                        </td>
                        <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">{lead.project}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-xs text-muted-foreground hidden md:table-cell">{lead.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card className="border border-border shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border border-border shadow-none mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Content Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Portfolio Projects", count: portfolioProjects.length, icon: Briefcase },
                  { label: "Testimonials", count: testimonials.length, icon: CheckCircle2 },
                  { label: "Blog Articles", count: blogPosts.length, icon: FileText },
                  { label: "Services", count: 6, icon: Activity },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
