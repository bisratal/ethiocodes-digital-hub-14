import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/content";
import { toast } from "sonner";

const AdminBlog = () => {
  const [search, setSearch] = useState("");
  const filtered = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your published articles.</p>
        </div>
        <Button className="font-semibold" onClick={() => toast.info("Create post form coming soon")}>
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-10 bg-card border-border"
        />
      </div>

      <Card className="border border-border shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Author</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Tags</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post, i) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-foreground">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{post.excerpt}</p>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{post.author}</td>
                    <td className="px-5 py-3.5 text-muted-foreground text-xs hidden sm:table-cell">{post.date}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[11px] font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => toast.info("Delete functionality coming with backend")}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No posts found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlog;
