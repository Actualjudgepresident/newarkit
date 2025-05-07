<<<<<<< HEAD
import db from '../connect.js';

// Get all products
export const getAllProducts = (req, res) => {
=======
const db = require('../connect');

exports.getAllProducts = (req, res) => {
>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
  const sql = 'SELECT * FROM Product';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch products.' });
    }
    res.status(200).json(results);
  });
};

<<<<<<< HEAD
// Get product by ID
export const getProductById = (req, res) => {
=======
exports.getProductById = (req, res) => {
>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
  const sql = 'SELECT * FROM Product WHERE id = ?';
  const id = req.params.id;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching product.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json(results[0]);
  });
};

<<<<<<< HEAD
// Create new product
export const createProduct = (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: 'Name, price, and image are required.' });
  }

  const sql = 'INSERT INTO Product (name, price, image) VALUES (?, ?, ?)';
=======

exports.createProduct = (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const sql = 'INSERT INTO Product (name, price, image) VALUES (?, ?, ?)';

>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
  db.query(sql, [name, price, image], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Failed to add product.' });
    }
    res.status(201).json({ id: result.insertId, message: 'Product created successfully.' });
  });
};

<<<<<<< HEAD
// Update product
export const updateProduct = (req, res) => {
=======
exports.updateProduct = (req, res) => {
>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
  const { name, price, image } = req.body;
  const id = req.params.id;

  const sql = 'UPDATE Product SET name = ?, price = ?, image = ? WHERE id = ?';
<<<<<<< HEAD
=======

>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
  db.query(sql, [name, price, image, id], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Failed to update product.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product updated successfully.' });
  });
};

<<<<<<< HEAD
// Delete product
export const deleteProduct = (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM Product WHERE id = ?';
=======
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Product WHERE id = ?';

>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete product.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product deleted successfully.' });
  });
};
