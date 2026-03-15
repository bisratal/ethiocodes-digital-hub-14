import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blogPosts as initialPosts } from "@/data/content";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  excerpt: string;
  image: string;
}

const emptyPost: BlogPost = { id: "", title: "", author: "", date: new Date().toISOString().slice(0, 10), tags: [], excerpt: "", image: "" };

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost>(emptyPost);
  const [deleteTarget, setDeleteTarget] = useState<string>("");
  const [tagsInput, setTagsInput] = useState("");

  const filtered = posts.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingPost({ ...emptyPost, id: `post-${Date.now()}` });
    setTagsInput("");
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setTagsInput(post.tags.join(", "));
    setDialogOpen(true);
  };

  const handleSave = () => {
    const post = { ...editingPost, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    const exists = posts.find((p) => p.id === post.id);
    if (exists) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
      toast.success("Post updated");
    } else {
      setPosts([post, ...posts]);
      toast.success("Post created");
    }
  };

  const handleDelete = () => {
    setPosts(posts.filter((p) => p.id !== deleteTarget));
    toast.success("Post deleted");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your published articles.</p>
        </div>
        <Button className="font-semibold" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-10 bg-card border-border" />
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
                  <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-foreground">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{post.excerpt}</p>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{post.author}</td>
                    <td className="px-5 py-3.5 text-muted-foreground text-xs hidden sm:table-cell">{post.date}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[11px] font-medium">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => openEdit(post)}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => { setDeleteTarget(post.id); setDeleteOpen(true); }}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No posts found.</div>}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <AdminFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={posts.find((p) => p.id === editingPost.id) ? "Edit Post" : "New Post"} onSubmit={handleSave}>
        <div>
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input className="mt-1.5" value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Author</label>
          <Input className="mt-1.5" value={editingPost.author} onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Excerpt</label>
          <Textarea className="mt-1.5" rows={3} value={editingPost.excerpt} onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Tags (comma separated)</label>
          <Input className="mt-1.5" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="React, Performance" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Date</label>
          <Input type="date" className="mt-1.5" value={editingPost.date} onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })} />
        </div>
      </AdminFormDialog>

      {/* Delete Confirm */}
      <AdminFormDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Post" onSubmit={handleDelete} submitLabel="Delete" destructive>
        <p className="text-sm text-muted-foreground">Are you sure you want to delete this post? This action cannot be undone.</p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminBlog;
