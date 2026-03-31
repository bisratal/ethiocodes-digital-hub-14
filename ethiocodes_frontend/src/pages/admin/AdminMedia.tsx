import { useState, useRef, useEffect } from "react";
import { Upload, Image as ImageIcon, Trash2, FileText, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";
import api from "@/lib/api";

interface MediaFile {
  id: number;
  name: string;
  filename: string;
  size: number;
  sizeFormatted: string;
  date: string;
  url: string;
  type: string;
  folder: string;
  created_at: string;
}

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number>(-1);
  const [deleting, setDeleting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch media files from API
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get("/media");
      // Handle different API response structures
      let mediaData = [];
      if (res.data?.media && Array.isArray(res.data.media)) {
        mediaData = res.data.media;
      } else if (Array.isArray(res.data)) {
        mediaData = res.data;
      }
      
      // Format the data for display
      const formattedFiles = mediaData.map((file: any) => ({
        id: file.id,
        name: file.name,
        filename: file.filename,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        date: formatDate(file.created_at),
        url: file.url,
        type: file.type.startsWith("image/") ? "image" : "file",
        folder: file.folder,
        created_at: file.created_at,
      }));
      
      setFiles(formattedFiles);
    } catch (err) {
      console.error("Failed to fetch media:", err);
      toast.error("Failed to load media files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  // Upload files to API
  const uploadFiles = async (fileList: FileList) => {
    setUploading(true);
    const filesToUpload = Array.from(fileList);
    let successCount = 0;
    let errorCount = 0;

    for (const file of filesToUpload) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        errorCount++;
        continue;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type`);
        errorCount++;
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "general");

      try {
        const res = await api.post("/media/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        // Add the new file to the list
        const newFile: MediaFile = {
          id: res.data.id,
          name: res.data.name,
          filename: res.data.filename || file.name,
          size: file.size,
          sizeFormatted: formatFileSize(file.size),
          date: formatDate(new Date().toISOString()),
          url: res.data.url,
          type: file.type.startsWith("image/") ? "image" : "file",
          folder: "general",
          created_at: new Date().toISOString(),
        };
        
        setFiles((prev) => [newFile, ...prev]);
        successCount++;
      } catch (err: any) {
        console.error(`Failed to upload ${file.name}:`, err);
        toast.error(`Failed to upload ${file.name}: ${err.response?.data?.error || "Unknown error"}`);
        errorCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} file(s) uploaded successfully`);
    }
    if (errorCount > 0) {
      toast.error(`${errorCount} file(s) failed to upload`);
    }
    
    setUploading(false);
  };

  const handleFiles = (fileList: FileList) => {
    if (fileList.length === 0) return;
    uploadFiles(fileList);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/media/${deleteTarget}`);
      setFiles(files.filter((f) => f.id !== deleteTarget));
      toast.success("File deleted successfully");
      setDeleteOpen(false);
      setDeleteTarget(-1);
    } catch (err: any) {
      console.error("Failed to delete file:", err);
      toast.error(err.response?.data?.error || "Failed to delete file");
    } finally {
      setDeleting(false);
    }
  };

  const copyToClipboard = (url: string) => {
    const fullUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${url}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("URL copied to clipboard");
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
            <p className="text-sm text-muted-foreground mt-1">Upload and manage media files.</p>
          </div>
        </div>

        <Card className="border-2 border-dashed border-border shadow-none">
          <CardContent className="p-10 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading media files...</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="border border-border shadow-none">
              <div className="aspect-square bg-muted animate-pulse"></div>
              <CardContent className="p-3">
                <div className="h-3 bg-muted rounded animate-pulse mb-1"></div>
                <div className="h-2 bg-muted rounded animate-pulse w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload and manage media files.</p>
        </div>
        <Button 
          className="font-semibold" 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {uploading ? "Uploading..." : "Upload Files"}
        </Button>
        <input 
          ref={fileInputRef} 
          type="file" 
          multiple 
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf" 
          className="hidden" 
          onChange={(e) => e.target.files && handleFiles(e.target.files)} 
          disabled={uploading}
        />
      </div>

      {/* Drop zone */}
      <Card
        className={`border-2 border-dashed shadow-none transition-colors cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <CardContent className="p-10 text-center">
          {uploading ? (
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
          ) : (
            <Upload className={`h-10 w-10 mx-auto mb-3 ${isDragging ? "text-primary" : "text-muted-foreground/40"}`} />
          )}
          <p className="text-sm font-medium text-foreground">
            {uploading ? "Uploading files..." : (isDragging ? "Drop files here" : "Drag & drop files here")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP, GIF, SVG, PDF up to 10MB</p>
        </CardContent>
      </Card>

      {/* Grid */}
      {files.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No files uploaded yet. Drag and drop or click to upload.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <Card 
              key={file.id} 
              className="border border-border shadow-none group overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => copyToClipboard(file.url)}
            >
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                {file.type === "image" && file.url ? (
                  <img 
                    src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${file.url}`} 
                    alt={file.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement?.querySelector(".fallback-icon")?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div className={`fallback-icon ${file.type === "image" ? "hidden" : ""} flex items-center justify-center`}>
                  <FileText className="h-8 w-8 text-muted-foreground/20" />
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(file.id);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-xs font-medium text-foreground truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {file.sizeFormatted} · {file.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <AdminFormDialog 
        open={deleteOpen} 
        onOpenChange={setDeleteOpen} 
        title="Delete File" 
        onSubmit={handleDelete} 
        submitLabel={deleting ? "Deleting..." : "Delete"}
        destructive
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this file? This action cannot be undone.
        </p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminMedia;