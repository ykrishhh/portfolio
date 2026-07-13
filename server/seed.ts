import bcrypt from 'bcryptjs';
import { getDb } from './db';

const db = getDb();

const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD || 'changeme123';

const hash = bcrypt.hashSync(password, 10);
const existing = db.prepare('SELECT id FROM admin_users WHERE username = ?').get(username);

if (existing) {
  console.log(`Admin user "${username}" already exists.`);
} else {
  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(username, hash);
  console.log(`Created admin user "${username}".`);
}
