import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Qpmyx5678',
  database: 'newark_it'
});

db.connect(err => {
  if (err) {
    console.error('Failed to connect to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
});

export default db;
