import { useState, useEffect, useMemo } from 'react';
import { marked } from 'marked';
import { getPost, type BlogPost } from '../api/client';

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getPost(slug)
      .then(p => { setPost(p); document.title = `${p.title} — krish`; })
      .catch(() => setError('Post not found'))
      .finally(() => setLoading(false));
    return () => { document.title = 'krish — portfolio'; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse space-y-3 w-96">
          <div className="h-6 bg-[#1a1a1a] rounded w-3/4 mx-auto" />
          <div className="h-3 bg-[#1a1a1a] rounded w-1/2 mx-auto" />
          <div className="space-y-2 mt-8">
            <div className="h-3 bg-[#1a1a1a] rounded" />
            <div className="h-3 bg-[#1a1a1a] rounded w-5/6" />
            <div className="h-3 bg-[#1a1a1a] rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <p className="font-mono text-sm text-gray-600 mb-4">{error || 'Not found'}</p>
        <a href="/" className="font-mono text-xs text-green-500 hover:underline">&larr; Back home</a>
      </div>
    );
  }

  const tags = post.tags ? JSON.parse(post.tags) : [];

  const renderedContent = useMemo(() => {
    return marked(post.content, { async: false }) as string;
  }, [post.content]);

  return (
    <article className="min-h-screen bg-black text-gray-300 font-mono">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <a href="/#writeups" className="text-xs text-gray-600 hover:text-green-500 transition-colors mb-8 inline-block">
          &larr; Back to writeups
        </a>

        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-sm text-gray-400 mb-4">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-600">
            <time>{new Date(post.created_at).toLocaleDateString()}</time>
            {tags.length > 0 && (
              <>
                <span className="text-gray-800">·</span>
                {tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20">
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </header>

        <div className="border-t border-[#1a1a1a] pt-8">
          <div
            className="blog-content text-sm sm:text-base leading-relaxed text-gray-400"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
        </div>
      </div>
    </article>
  );
}
