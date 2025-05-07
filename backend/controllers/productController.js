const db = require('../connect');

// Get all products
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM Product', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Get product by ID
exports.getProductById = (req, res) => {
  db.query('SELECT * FROM Product WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(results[0]);
  });
};

// Create new product
exports.createProduct = (req, res) => {
  const { name, price, image } = req.body;
  const query = 'INSERT INTO Product (name, price, image) VALUES (?, ?, ?)';
  db.query(query, [name, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Product added successfully' });
  });
};

// Update product
exports.updateProduct = (req, res) => {
  const { name, price, image } = req.body;
  const query = 'UPDATE Product SET name = ?, price = ?, image = ? WHERE id = ?';
  db.query(query, [name, price, image, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Product updated successfully' });
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  db.query('DELETE FROM Product WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Product deleted successfully' });
  });
};
