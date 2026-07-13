import { useState, useEffect } from 'react';
import { getAllPosts, createPost, updatePost, deletePost, type BlogPost } from '../api/client';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function PostEditor({ post, onDone }: { post?: BlogPost; onDone: () => void }) {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [tagsStr, setTagsStr] = useState(post?.tags ? JSON.parse(post.tags).join(', ') : '');
  const [published, setPublished] = useState(post?.published === 1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
    const data = { title, slug, excerpt, content, tags, published };
    try {
      if (post) await updatePost(post.id, data);
      else await createPost(data);
      onDone();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="post-title" className="text-xs text-gray-500 font-mono block mb-1">Title</label>
        <input id="post-title" value={title} onChange={e => { setTitle(e.target.value); if (!post) setSlug(slugify(e.target.value)); }}
          className="w-full px-3 py-2 rounded bg-black border border-[#1a1a1a] font-mono text-sm text-gray-300 focus:outline-none focus:border-green-500/50" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="post-slug" className="text-xs text-gray-500 font-mono block mb-1">Slug</label>
          <input id="post-slug" value={slug} onChange={e => setSlug(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black border border-[#1a1a1a] font-mono text-sm text-gray-300 focus:outline-none focus:border-green-500/50" />
        </div>
        <div>
          <label htmlFor="post-tags" className="text-xs text-gray-500 font-mono block mb-1">Tags (comma separated)</label>
          <input id="post-tags" value={tagsStr} onChange={e => setTagsStr(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black border border-[#1a1a1a] font-mono text-sm text-gray-300 focus:outline-none focus:border-green-500/50" />
        </div>
      </div>
      <div>
        <label htmlFor="post-excerpt" className="text-xs text-gray-500 font-mono block mb-1">Excerpt</label>
        <input id="post-excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)}
          className="w-full px-3 py-2 rounded bg-black border border-[#1a1a1a] font-mono text-sm text-gray-300 focus:outline-none focus:border-green-500/50" />
      </div>
      <div>
        <label htmlFor="post-content" className="text-xs text-gray-500 font-mono block mb-1">Content (Markdown)</label>
        <textarea id="post-content" rows={12} value={content} onChange={e => setContent(e.target.value)}
          className="w-full px-3 py-2 rounded bg-black border border-[#1a1a1a] font-mono text-sm text-gray-300 focus:outline-none focus:border-green-500/50 resize-y" />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)}
          className="accent-green-500" />
        <span className="text-xs text-gray-500 font-mono">Published</span>
      </label>
      {error && <div className="text-xs text-red-400 font-mono" role="alert">{error}</div>}
      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="px-4 py-2 font-mono text-xs rounded border border-green-500/30 text-green-500 hover:bg-green-500/10 disabled:opacity-50 transition-all duration-200">
          {saving ? 'Saving...' : post ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onDone}
          className="px-4 py-2 font-mono text-xs rounded border border-[#1a1a1a] text-gray-500 hover:text-gray-400 transition-all duration-200">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setPosts(await getAllPosts()); } catch { /* authFetch handles 401 */ }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deletePost(id);
    load();
  };

  if (editingPost || creating) {
    return (
      <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 49px)' }}>
        <h2 className="font-mono text-sm text-green-500 uppercase tracking-wider mb-4">
          {creating ? 'New Post' : 'Edit Post'}
        </h2>
        <PostEditor post={editingPost} onDone={() => { setEditingPost(undefined); setCreating(false); load(); }} />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto" style={{ height: 'calc(100vh - 49px)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]">
        <div>
          <h2 className="font-mono text-sm text-green-500 uppercase tracking-wider">Posts</h2>
          <p className="text-[10px] text-gray-600">{posts.filter(p => p.published).length} published · {posts.length} total</p>
        </div>
        <button onClick={() => setCreating(true)}
          className="px-3 py-1.5 font-mono text-[10px] rounded border border-green-500/30 text-green-500 hover:bg-green-500/10 transition-all duration-200 uppercase tracking-wider">
          + New
        </button>
      </div>

      {loading ? (
        <div className="p-4 space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse bg-[#1a1a1a] rounded h-12" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center px-6">
          <p className="text-sm text-gray-700 mb-1">No posts yet</p>
          <p className="text-[10px] text-gray-800 mb-4">Write your first blog post.</p>
          <button onClick={() => setCreating(true)}
            className="px-4 py-2 font-mono text-xs rounded border border-green-500/30 text-green-500 hover:bg-green-500/10 transition-all">
            Create Post
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[#1a1a1a]">
          {posts.map(post => (
            <div key={post.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#0a0a0a] transition-colors group">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${post.published ? 'bg-green-500/60' : 'bg-gray-800'}`} title={post.published ? 'Published' : 'Draft'} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white truncate">{post.title}</span>
                  {!post.published && <span className="text-[9px] text-gray-700 font-mono uppercase">Draft</span>}
                </div>
                <p className="text-[10px] text-gray-700">
                  /{post.slug} · {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingPost(post)}
                  className="text-[10px] text-gray-600 hover:text-green-500 transition-colors">Edit</button>
                <button onClick={() => handleDelete(post.id, post.title)}
                  className="text-[10px] text-gray-600 hover:text-red-400 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
