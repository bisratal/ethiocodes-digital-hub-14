import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";

const AdminSettings = () => {
  const [siteName, setSiteName] = useState("EthioCodes");
  const [contactEmail, setContactEmail] = useState("hello@ethiocodes.com");
  const [tagline, setTagline] = useState("Building Ethiopia's Digital Future");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetOpen, setResetOpen] = useState(false);

  const handleSaveGeneral = () => {
    if (!siteName.trim() || !contactEmail.trim()) { toast.error("Site name and email are required"); return; }
    toast.success("Settings saved successfully");
  };

  const handleUpdatePassword = () => {
    if (!currentPassword) { toast.error("Enter current password"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated successfully");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your admin panel configuration.</p>
      </div>

      <Card className="border border-border shadow-none">
        <CardHeader><CardTitle className="text-base">General</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Site Name</label>
            <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Contact Email</label>
            <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Tagline</label>
            <Input value={tagline} onChange={(e) => setTagline(e.target.value)} className="mt-1.5" />
          </div>
          <Button className="font-semibold" onClick={handleSaveGeneral}>Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-none">
        <CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Current Password</label>
            <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">New Password</label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Confirm New Password</label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1.5" />
          </div>
          <Button variant="outline" className="font-semibold" onClick={handleUpdatePassword}>Update Password</Button>
        </CardContent>
      </Card>

      <Card className="border border-destructive/20 shadow-none">
        <CardHeader><CardTitle className="text-base text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Permanently delete all content and reset the admin panel.</p>
          <Button variant="destructive" onClick={() => setResetOpen(true)}>Reset All Data</Button>
        </CardContent>
      </Card>

      <AdminFormDialog open={resetOpen} onOpenChange={setResetOpen} title="Reset All Data" onSubmit={() => toast.info("Demo mode — no data was deleted")} submitLabel="Reset Everything" destructive>
        <p className="text-sm text-muted-foreground">This will permanently delete all content including blog posts, portfolio projects, team members, and testimonials. This action cannot be undone.</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminSettings;
