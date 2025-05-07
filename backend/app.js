// backend/app.js
import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import path from 'path';
import { fileURLToPath } from 'url';
=======
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
import db from './connect.js';
>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8

import db from './connect.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = 3000;

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// API Routes should come first
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Serve frontend static files from /docs
app.use(express.static(path.join(__dirname, '../docs')));

// Optional: Serve index.html only for root (not for all undefined routes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// Handle unmatched API routes with 404
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
=======
app.use('/', userRoutes);
app.use('/', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
});
