import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";
import api from "@/lib/api";

interface Settings {
  siteName: string;
  contactEmail: string;
  tagline: string;
  siteUrl: string;
  adminEmail: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    siteName: "EthioCodes",
    contactEmail: "hello@ethiocodes.com",
    tagline: "Building Ethiopia's Digital Future",
    siteUrl: "",
    adminEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Reset dialog
  const [resetOpen, setResetOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Fetch settings from API (if stored on backend)
  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Try to get settings from API if they're stored
      const res = await api.get("/settings").catch(() => null);
      if (res?.data) {
        setSettings({
          siteName: res.data.siteName || "EthioCodes",
          contactEmail: res.data.contactEmail || "hello@ethiocodes.com",
          tagline: res.data.tagline || "Building Ethiopia's Digital Future",
          siteUrl: res.data.siteUrl || "",
          adminEmail: res.data.adminEmail || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      // Use default settings from .env
      setSettings({
        siteName: import.meta.env.VITE_SITE_NAME || "EthioCodes",
        contactEmail: import.meta.env.VITE_CONTACT_EMAIL || "hello@ethiocodes.com",
        tagline: import.meta.env.VITE_TAGLINE || "Building Ethiopia's Digital Future",
        siteUrl: import.meta.env.VITE_SITE_URL || "",
        adminEmail: import.meta.env.VITE_ADMIN_EMAIL || "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveGeneral = async () => {
    if (!settings.siteName.trim() || !settings.contactEmail.trim()) {
      toast.error("Site name and email are required");
      return;
    }

    if (!settings.contactEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSaving(true);
    try {
      // Save settings to API
      const response = await api.put("/settings", {
        siteName: settings.siteName,
        contactEmail: settings.contactEmail,
        tagline: settings.tagline,
        siteUrl: settings.siteUrl,
        adminEmail: settings.adminEmail,
      });
      
      toast.success("Settings saved successfully");
      
      // Update environment or localStorage if needed
      localStorage.setItem("siteName", settings.siteName);
      localStorage.setItem("contactEmail", settings.contactEmail);
    } catch (err: any) {
      console.error("Failed to save settings:", err);
      toast.error(err.response?.data?.error || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      toast.error("Enter current password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setChangingPassword(true);
    try {
      const response = await api.post("/auth/change-password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Failed to update password:", err);
      toast.error(err.response?.data?.error || "Failed to update password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleResetAllData = async () => {
    setResetting(true);
    try {
      // This would require a special admin endpoint
      const response = await api.post("/admin/reset-all", {
        confirm: true,
      });
      
      toast.success("All data has been reset successfully");
      setResetOpen(false);
      
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error("Failed to reset data:", err);
      toast.error(err.response?.data?.error || "Failed to reset data. Please contact support.");
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your admin panel configuration.</p>
        </div>
        
        <Card className="border border-border shadow-none">
          <CardHeader><CardTitle className="text-base">General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mb-2"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mb-2"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mb-2"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your admin panel configuration.</p>
      </div>

      {/* General Settings */}
      <Card className="border border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Site Name <span className="text-red-500">*</span>
            </label>
            <Input 
              value={settings.siteName} 
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} 
              className="mt-1.5"
              placeholder="Enter your site name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <Input 
              type="email"
              value={settings.contactEmail} 
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} 
              className="mt-1.5"
              placeholder="contact@example.com"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This email will receive lead notifications and contact form submissions
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Tagline</label>
            <Input 
              value={settings.tagline} 
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} 
              className="mt-1.5"
              placeholder="Your company tagline"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Site URL</label>
            <Input 
              value={settings.siteUrl} 
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })} 
              className="mt-1.5"
              placeholder="https://ethiocodes.com"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Used for email links and SEO
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Admin Email</label>
            <Input 
              type="email"
              value={settings.adminEmail} 
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })} 
              className="mt-1.5"
              placeholder="admin@ethiocodes.com"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email address for admin notifications
            </p>
          </div>
          <Button 
            className="font-semibold" 
            onClick={handleSaveGeneral}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Current Password</label>
            <Input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              className="mt-1.5"
              placeholder="Enter your current password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">New Password</label>
            <Input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="mt-1.5"
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Confirm New Password</label>
            <Input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="mt-1.5"
              placeholder="Confirm your new password"
            />
          </div>
          <Button 
            variant="outline" 
            className="font-semibold" 
            onClick={handleUpdatePassword}
            disabled={changingPassword}
          >
            {changingPassword ? "Updating..." : "Update Password"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            ⚠️ Password must be at least 6 characters long
          </p>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-destructive/20 shadow-none">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Permanently delete all content and reset the admin panel. This action cannot be undone.
          </p>
          <p className="text-xs text-destructive/70 mb-4">
            ⚠️ This will delete: Blog posts, Portfolio projects, Services, Team members, Testimonials, and Leads
          </p>
          <Button 
            variant="destructive" 
            onClick={() => setResetOpen(true)}
            disabled={resetting}
          >
            {resetting ? "Resetting..." : "Reset All Data"}
          </Button>
        </CardContent>
      </Card>

      {/* Reset Confirmation Dialog */}
      <AdminFormDialog 
        open={resetOpen} 
        onOpenChange={setResetOpen} 
        title="Reset All Data" 
        onSubmit={handleResetAllData} 
        submitLabel={resetting ? "Resetting..." : "Reset Everything"}
        destructive
      >
        <p className="text-sm text-muted-foreground mb-3">
          This will permanently delete all content including:
        </p>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mb-4">
          <li>All blog posts and articles</li>
          <li>All portfolio projects</li>
          <li>All services</li>
          <li>All team members</li>
          <li>All testimonials</li>
          <li>All leads and inquiries</li>
        </ul>
        <p className="text-sm text-red-600 font-medium">
          This action cannot be undone. Type "CONFIRM" to proceed.
        </p>
        <Input 
          className="mt-3" 
          placeholder="Type CONFIRM to reset all data"
          id="confirm-reset"
          onChange={(e) => {
            // Optional: Add confirmation input validation
            const confirmInput = e.target.value;
            const submitBtn = document.querySelector("#reset-submit-btn");
            if (submitBtn) {
              // @ts-ignore
              submitBtn.disabled = confirmInput !== "CONFIRM";
            }
          }}
        />
      </AdminFormDialog>

      {/* System Info */}
      <Card className="border border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base">System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">API Version</span>
            <span className="text-foreground">1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Environment</span>
            <span className="text-foreground">
              {import.meta.env.MODE || "development"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">API URL</span>
            <span className="text-foreground text-xs">
              {import.meta.env.VITE_API_URL || "http://localhost:5000"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;