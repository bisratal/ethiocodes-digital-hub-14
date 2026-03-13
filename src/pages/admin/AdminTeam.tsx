import { motion } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/data/content";
import { toast } from "sonner";

const AdminTeam = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your team roster.</p>
      </div>
      <Button className="font-semibold" onClick={() => toast.info("Coming soon")}>
        <Plus className="h-4 w-4 mr-2" /> Add Member
      </Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member, i) => (
        <motion.div key={member.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Card className="border border-border shadow-none hover:shadow-card transition-shadow">
            <CardContent className="p-5 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center text-primary text-xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
              <p className="text-xs text-secondary font-medium">{member.role}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
              <div className="flex gap-2 justify-center mt-4 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="text-xs h-7"><Edit className="h-3 w-3 mr-1" />Edit</Button>
                <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground hover:text-destructive" onClick={() => toast.info("Coming with backend")}>
                  <Trash2 className="h-3 w-3 mr-1" />Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AdminTeam;
