import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Trash2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";

interface MediaFile {
  id: number;
  name: string;
  size: string;
  date: string;
  url?: string;
  type: string;
}

const initialFiles: MediaFile[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `image-${i + 1}.jpg`,
  size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
  date: "Dec 2024",
  type: "image",
}));

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList) => {
    const newFiles: MediaFile[] = Array.from(fileList).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      url: URL.createObjectURL(f),
      type: f.type.startsWith("image") ? "image" : "file",
    }));
    setFiles([...newFiles, ...files]);
    toast.success(`${newFiles.length} file(s) uploaded`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const handleDelete = () => { setFiles(files.filter((f) => f.id !== deleteTarget)); toast.success("File deleted"); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload and manage media files.</p>
        </div>
        <Button className="font-semibold" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4 mr-2" /> Upload Files
        </Button>
        <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.svg" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
      </div>

      {/* Drop zone */}
      <Card
        className={`border-2 border-dashed shadow-none transition-colors cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <CardContent className="p-10 text-center">
          <Upload className={`h-10 w-10 mx-auto mb-3 ${isDragging ? "text-primary" : "text-muted-foreground/40"}`} />
          <p className="text-sm font-medium text-foreground">{isDragging ? "Drop files here" : "Drag & drop files here"}</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG, GIF up to 10MB</p>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((img) => (
          <Card key={img.id} className="border border-border shadow-none group overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center relative overflow-hidden">
              {img.url ? (
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground/20" />
              )}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => { setDeleteTarget(img.id); setDeleteOpen(true); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-xs font-medium text-foreground truncate">{img.name}</p>
              <p className="text-[11px] text-muted-foreground">{img.size} · {img.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-16 text-muted-foreground text-sm">No files uploaded yet.</div>
      )}

      <AdminFormDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete File" onSubmit={handleDelete} submitLabel="Delete" destructive>
        <p className="text-sm text-muted-foreground">Are you sure you want to delete this file?</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminMedia;
