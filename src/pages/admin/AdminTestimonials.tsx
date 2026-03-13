import { motion } from "framer-motion";
import { Edit, Trash2, Plus, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/content";
import { toast } from "sonner";

const AdminTestimonials = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage client testimonials.</p>
      </div>
      <Button className="font-semibold" onClick={() => toast.info("Coming soon")}>
        <Plus className="h-4 w-4 mr-2" /> Add Testimonial
      </Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {testimonials.map((t, i) => (
        <motion.div key={t.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
            <CardContent className="p-5">
              <Quote className="h-5 w-5 text-secondary/40 mb-2" />
              <p className="text-sm text-muted-foreground italic line-clamp-3">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Edit className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => toast.info("Coming with backend")}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AdminTestimonials;
