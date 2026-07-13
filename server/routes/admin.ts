import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production-krish';

function auth(req: Request, res: Response): boolean {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as any;
    (req as any).user = payload;
    return true;
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return false;
  }
}

router.get('/messages', (req: Request, res: Response) => {
  if (!auth(req, res)) return;

  const db = getDb();
  const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(messages);
});

router.patch('/messages/:id/read', (req: Request, res: Response) => {
  if (!auth(req, res)) return;

  const db = getDb();
  db.prepare('UPDATE messages SET read = 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

router.get('/stats', (req: Request, res: Response) => {
  if (!auth(req, res)) return;

  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as c FROM messages').get() as any).c;
  const unread = (db.prepare('SELECT COUNT(*) as c FROM messages WHERE read = 0').get() as any).c;
  res.json({ totalMessages: total, unreadMessages: unread });
});

router.get('/verify', (req: Request, res: Response) => {
  if (!auth(req, res)) return;
  res.json({ valid: true, username: (req as any).user.username });
});

export default router;
