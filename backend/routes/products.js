import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Gaming Laptop', price: 1000 }]);
});

export default router;
