import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminFormDialog from "@/components/admin/AdminFormDialog";
import { api } from "@/lib/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: number;
  author?: {
    id: number;
    name: string;
    email: string;
  };
  status: "Draft" | "Published";
  category: string;
  tags: string[];
  featured_image_id: number | null;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const emptyPost: BlogPost = {
  id: 0,
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  author_id: 0,
  status: "Draft",
  category: "",
  tags: [],
  featured_image_id: null,
  view_count: 0,
  published_at: null,
  created_at: "",
  updated_at: "",
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost>(emptyPost);
  const [deleteTarget, setDeleteTarget] = useState<number>(0);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch blog posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blog");
      // Handle different API response structures
      let postsData = [];
      if (res.data?.posts && Array.isArray(res.data.posts)) {
        postsData = res.data.posts;
      } else if (Array.isArray(res.data)) {
        postsData = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        postsData = res.data.data;
      }
      setPosts(postsData);
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.author?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingPost({
      ...emptyPost,
      id: 0,
      status: "Draft",
    });
    setTagsInput("");
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setTagsInput(post.tags?.join(", ") || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingPost.title || !editingPost.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const postData = {
        title: editingPost.title,
        content: editingPost.content,
        excerpt: editingPost.excerpt,
        status: editingPost.status,
        category: editingPost.category,
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      };

      let response;
      if (editingPost.id) {
        // Update existing post
        response = await api.put(`/blog/${editingPost.id}`, postData);
        setPosts(posts.map((p) => (p.id === editingPost.id ? response.data : p)));
        toast.success("Post updated successfully");
      } else {
        // Create new post
        response = await api.post("/blog", postData);
        setPosts([response.data, ...posts]);
        toast.success("Post created successfully");
      }
      setDialogOpen(false);
      fetchPosts(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to save post:", err);
      toast.error(err.response?.data?.error || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/blog/${deleteTarget}`);
      setPosts(posts.filter((p) => p.id !== deleteTarget));
      toast.success("Post deleted successfully");
      setDeleteOpen(false);
      setDeleteTarget(0);
    } catch (err: any) {
      console.error("Failed to delete post:", err);
      toast.error(err.response?.data?.error || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Draft";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your published articles.</p>
          </div>
          <Button className="font-semibold" disabled>
            <Plus className="h-4 w-4 mr-2" /> New Post
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search posts..." disabled className="pl-9 h-10 bg-card border-border" />
        </div>

        <Card className="border border-border shadow-none">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading blog posts...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-10 bg-card border-border"
        />
      </div>

      <Card className="border border-border shadow-none">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              {search ? "No posts match your search." : "No blog posts yet. Create your first post!"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Author</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Status</th>
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
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {post.excerpt?.substring(0, 80) || "No excerpt"}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
                        {post.author?.name || "Admin"}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs hidden sm:table-cell">
                        {formatDate(post.published_at || post.created_at)}
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            post.status === "Published"
                              ? "bg-green-500/15 text-green-600"
                              : "bg-yellow-500/15 text-yellow-600"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {(post.tags || []).slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[11px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {(post.tags || []).length > 2 && (
                            <span className="text-[11px] text-muted-foreground">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => openEdit(post)}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => {
                              setDeleteTarget(post.id);
                              setDeleteOpen(true);
                            }}
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
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <AdminFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingPost.id ? "Edit Post" : "New Post"}
        onSubmit={handleSave}
        submitLabel={saving ? "Saving..." : editingPost.id ? "Update" : "Create"}
      >
        <div>
          <label className="text-sm font-medium text-foreground">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            className="mt-1.5"
            value={editingPost.title}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
            placeholder="Enter post title"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Content <span className="text-red-500">*</span>
          </label>
          <Textarea
            className="mt-1.5 font-mono text-sm"
            rows={8}
            value={editingPost.content}
            onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
            placeholder="Write your post content here (HTML supported)..."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Excerpt</label>
          <Textarea
            className="mt-1.5"
            rows={2}
            value={editingPost.excerpt}
            onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
            placeholder="Short summary of the post..."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Category</label>
          <Input
            className="mt-1.5"
            value={editingPost.category}
            onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
            placeholder="e.g., Web Development, Technology"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Tags (comma separated)</label>
          <Input
            className="mt-1.5"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="React, Performance, Tutorial"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Status</label>
          <select
            className="mt-1.5 w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
            value={editingPost.status}
            onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as "Draft" | "Published" })}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </AdminFormDialog>

      {/* Delete Confirm */}
      <AdminFormDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Post"
        onSubmit={handleDelete}
        submitLabel={deleting ? "Deleting..." : "Delete"}
        destructive
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
      </AdminFormDialog>
    </div>
  );
};

export default AdminBlog;