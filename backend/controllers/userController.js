<<<<<<< HEAD
import db from '../connect.js';

// REGISTER USER
export const registerUser = (req, res) => {
  const {
    fullName,
    email,
    password,        // Optional: store in Customer table if schema supports
    address,
    cardNumber,
    securityCode,
    cardType
  } = req.body;

  if (!fullName || !email || !address || !cardNumber || !securityCode || !cardType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const [firstName, ...lastParts] = fullName.split(' ');
  const lastName = lastParts.join(' ') || '';

  const insertCustomerQuery = `
    INSERT INTO Customer (FirstName, LastName, HomeAddress, Telephone, Email, Status)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(insertCustomerQuery, [firstName, lastName, address, '', email, 'Regular'], (err, result) => {
    if (err) {
      console.error('[Customer Insert Error]', err);
      return res.status(500).json({ message: 'Customer insert failed', error: err });
    }

    const customerId = result.insertId;

    const insertCardQuery = `
      INSERT INTO CreditCard (CardNumber, SecurityNumber, OwnerName, BillingAddress, CardType, ExpiryDate, CustomerID)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      insertCardQuery,
      [cardNumber, securityCode, fullName, address, cardType, '2026-12-31', customerId],
      (err2) => {
        if (err2) {
          console.error('[CreditCard Insert Error]', err2);
          return res.status(500).json({ message: 'Card insert failed', error: err2 });
        }

        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};

// LOGIN USER
export const loginUser = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const sql = 'SELECT * FROM Customer WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('[Login Error]', err);
      return res.status(500).json({ message: 'Login failed', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'No user found with that email.' });
    }

    res.status(200).json({ message: 'Login successful', user: results[0] });
=======
const db = require('../connect');

exports.registerUser = (req, res) => {
  const { name, email, password, address, creditCard } = req.body;
  const sql = 'INSERT INTO Customer (name, email, password, shippingAddress, creditCard) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, password, address, creditCard], (err, result) => {
    if (err) return res.status(500).json({ message: 'Registration failed', error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM Customer WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login error', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ message: 'Login successful' });
>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
  });
};
