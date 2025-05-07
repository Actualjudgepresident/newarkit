import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

const products = [
  { id: 1, name: 'Lenovo Legion 5', price: 1200, type: 'Gaming Laptop', image: 'https://via.placeholder.com/150?text=Lenovo+Legion+5' },
  { id: 2, name: 'ASUS ROG Strix', price: 1350, type: 'Gaming Laptop', image: 'https://via.placeholder.com/150?text=ASUS+ROG+Strix' },
  { id: 3, name: 'Logitech MX Master 3', price: 99, type: 'Wireless Mouse', image: 'https://via.placeholder.com/150?text=Logitech+MX+Master+3' },
  { id: 4, name: 'Razer Viper', price: 79, type: 'Wireless Mouse', image: 'https://via.placeholder.com/150?text=Razer+Viper' },
  { id: 5, name: 'LG UltraFine 4K', price: 450, type: '4K Monitor', image: 'https://via.placeholder.com/150?text=LG+UltraFine+4K' },
  { id: 6, name: 'Dell Ultrasharp 4K', price: 500, type: '4K Monitor', image: 'https://via.placeholder.com/150?text=Dell+Ultrasharp+4K' }
];

router.get('/', verifyToken, (req, res) => {
  res.json(products);
});

export default router;
