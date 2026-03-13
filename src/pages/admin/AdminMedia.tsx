import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const placeholderImages = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `image-${i + 1}.jpg`,
  size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
  date: "Dec 2024",
}));

const AdminMedia = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload and manage media files.</p>
      </div>
      <Button className="font-semibold" onClick={() => toast.info("Upload coming with backend")}>
        <Upload className="h-4 w-4 mr-2" /> Upload Files
      </Button>
    </div>

    {/* Drop zone */}
    <Card className="border-2 border-dashed border-border shadow-none hover:border-primary/30 transition-colors cursor-pointer">
      <CardContent className="p-10 text-center">
        <Upload className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-sm font-medium text-foreground">Drag & drop files here</p>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG, GIF up to 10MB</p>
      </CardContent>
    </Card>

    {/* Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {placeholderImages.map((img) => (
        <Card key={img.id} className="border border-border shadow-none group overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center relative">
            <ImageIcon className="h-8 w-8 text-muted-foreground/20" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => toast.info("Coming with backend")}>
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
  </div>
);

export default AdminMedia;
