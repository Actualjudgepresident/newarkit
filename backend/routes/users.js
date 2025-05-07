import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: 'User registered (demo only)' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login successful (demo only)' });
});

export default router;
