const express = require('express');
const router = express.Router();
const db = require('../connect');

// Get all products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Product';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Get a single product by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM Product WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(results[0]);
  });
});

// Add a new product
router.post('/', (req, res) => {
  const { name, price, image } = req.body;
  const query = 'INSERT INTO Product (name, price, image) VALUES (?, ?, ?)';
  db.query(query, [name, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Product added successfully' });
  });
});

// Update a product
router.put('/:id', (req, res) => {
  const { name, price, image } = req.body;
  const query = 'UPDATE Product SET name = ?, price = ?, image = ? WHERE id = ?';
  db.query(query, [name, price, image, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Product updated successfully' });
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM Product WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;
