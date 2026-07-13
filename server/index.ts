import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import blogRoutes from './routes/blog';

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on :${PORT}`);
});
