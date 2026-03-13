import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const AdminSettings = () => (
  <div className="space-y-6 max-w-3xl">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground mt-1">Manage your admin panel configuration.</p>
    </div>

    <Card className="border border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-base">General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Site Name</label>
          <Input defaultValue="EthioCodes" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Contact Email</label>
          <Input defaultValue="hello@ethiocodes.com" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Tagline</label>
          <Input defaultValue="Building Ethiopia's Digital Future" className="mt-1.5" />
        </div>
        <Button className="font-semibold" onClick={() => toast.success("Settings saved")}>Save Changes</Button>
      </CardContent>
    </Card>

    <Card className="border border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Current Password</label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">New Password</label>
          <Input type="password" className="mt-1.5" />
        </div>
        <Button variant="outline" className="font-semibold" onClick={() => toast.success("Password updated")}>Update Password</Button>
      </CardContent>
    </Card>

    <Card className="border border-destructive/20 shadow-none">
      <CardHeader>
        <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">Permanently delete all content and reset the admin panel.</p>
        <Button variant="destructive" onClick={() => toast.error("This is a demo — no data will be deleted")}>Reset All Data</Button>
      </CardContent>
    </Card>
  </div>
);

export default AdminSettings;
