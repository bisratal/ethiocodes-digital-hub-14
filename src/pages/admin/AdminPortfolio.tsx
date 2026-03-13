import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { portfolioProjects } from "@/data/content";
import { toast } from "sonner";

const AdminPortfolio = () => {
  const [search, setSearch] = useState("");
  const filtered = portfolioProjects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your showcase projects.</p>
        </div>
        <Button className="font-semibold" onClick={() => toast.info("Coming soon")}>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
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
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground"><Eye className="h-3 w-3 mr-1" />View</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground"><Edit className="h-3 w-3 mr-1" />Edit</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-destructive" onClick={() => toast.info("Coming with backend")}>
                    <Trash2 className="h-3 w-3 mr-1" />Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortfolio;
