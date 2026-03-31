import { ReactNode } from "react";
import { X } from "lucide-react";

interface AdminFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  disabled?: boolean;
}

export default function AdminFormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  destructive = false,
  disabled = false,
}: AdminFormDialogProps) {
  if (!open) return null;

  const handleSubmit = () => {
    if (!disabled) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600"
            disabled={disabled}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {description && (
            <p className="text-sm text-gray-500 mb-4">{description}</p>
          )}
          <div className="space-y-4">{children}</div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={disabled}
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              destructive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}