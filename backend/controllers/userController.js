const db = require('../connect');

exports.registerUser = (req, res) => {
  const { name, email, password, address, creditCard } = req.body;
  const query = 'INSERT INTO Customer (name, email, password, address, creditCard) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, password, address, creditCard], (err, result) => {
    if (err) return res.status(500).json({ message: 'Registration failed', error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM Customer WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login error', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ token: 'demo-jwt-token' }); // Replace with real JWT in production
  });
};
