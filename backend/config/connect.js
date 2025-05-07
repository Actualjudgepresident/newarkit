import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@Qpmyx5678',
  database: 'newark_it',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;
