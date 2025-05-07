import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Qpmyx5678',
  database: 'newark_it'
});

db.connect(err => {
  if (err) {
    console.error(' Failed to connect to MySQL:', err);
  } else {
    console.log(' Connected to MySQL database.');
  }
});

export default db;
