import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { getDb } from '../db';
import { sendContactNotification } from '../mail';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', limiter, async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  const db = getDb();
  const stmt = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
  stmt.run(name.trim(), email.trim(), message.trim());

  // Send notification email (non-blocking — won't reject the request)
  sendContactNotification({ name: name.trim(), email: email.trim(), message: message.trim() })
    .catch((err: unknown) => console.error('Email notification failed:', err));

  res.json({ success: true, message: 'Message received. I\'ll get back to you soon.' });
});

export default router;
