import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  destructive?: boolean;
}

const AdminFormDialog = ({
  open,
  onOpenChange,
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  destructive = false,
}: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-2">{children}</div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          variant={destructive ? "destructive" : "default"}
          onClick={() => {
            onSubmit();
            onOpenChange(false);
          }}
        >
          {submitLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AdminFormDialog;
