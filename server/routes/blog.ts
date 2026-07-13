import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production-krish';

function auth(req: Request, res: Response): boolean {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) { res.status(401).json({ error: 'Unauthorized' }); return false; }
  try { (req as any).user = jwt.verify(header.slice(7), JWT_SECRET); return true; }
  catch { res.status(401).json({ error: 'Invalid token' }); return false; }
}

// Public — list published posts
router.get('/', (_req: Request, res: Response) => {
  const db = getDb();
  const posts = db.prepare(
    "SELECT id, title, slug, excerpt, tags, created_at, updated_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC"
  ).all();
  res.json(posts);
});

// Public — get single post by slug
router.get('/:slug', (req: Request, res: Response) => {
  const db = getDb();
  const post = db.prepare("SELECT * FROM blog_posts WHERE slug = ? AND published = 1").get(req.params.slug);
  if (!post) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(post);
});

// Admin — list all posts (including drafts)
router.get('/admin/all', (req: Request, res: Response) => {
  if (!auth(req, res)) return;
  const db = getDb();
  res.json(db.prepare("SELECT * FROM blog_posts ORDER BY created_at DESC").all());
});

// Admin — create post
router.post('/', (req: Request, res: Response) => {
  if (!auth(req, res)) return;
  const { title, slug, excerpt, content, tags, published } = req.body;
  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    res.status(400).json({ error: 'title, slug, and content required' });
    return;
  }
  const db = getDb();
  try {
    db.prepare(
      'INSERT INTO blog_posts (title, slug, excerpt, content, tags, published) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(title, slug, excerpt || null, content, JSON.stringify(tags || []), published ? 1 : 0);
    res.json({ success: true });
  } catch (err: any) {
    if (err.message?.includes('UNIQUE')) { res.status(409).json({ error: 'Slug already exists' }); return; }
    throw err;
  }
});

// Admin — update post
router.put('/:id', (req: Request, res: Response) => {
  if (!auth(req, res)) return;
  const { title, slug, excerpt, content, tags, published } = req.body;
  const db = getDb();
  db.prepare(
    "UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, tags=?, published=?, updated_at=datetime('now') WHERE id=?"
  ).run(title, slug, excerpt || null, content, JSON.stringify(tags || []), published ? 1 : 0, req.params.id);
  res.json({ success: true });
});

// Admin — delete post
router.delete('/:id', (req: Request, res: Response) => {
  if (!auth(req, res)) return;
  const db = getDb();
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
