import { motion } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/content";
import { toast } from "sonner";

const AdminServices = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Services</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage the services you offer.</p>
      </div>
      <Button className="font-semibold" onClick={() => toast.info("Coming soon")}>
        <Plus className="h-4 w-4 mr-2" /> Add Service
      </Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services.map((service, i) => (
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
                <Button variant="outline" size="sm" className="text-xs h-8"><Edit className="h-3 w-3 mr-1" />Edit</Button>
                <Button variant="ghost" size="sm" className="text-xs h-8 text-muted-foreground hover:text-destructive" onClick={() => toast.info("Coming with backend")}>
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

export default AdminServices;
