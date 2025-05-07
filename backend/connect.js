import mysql from 'mysql2';
<<<<<<< HEAD

=======
import dotenv from 'dotenv';

dotenv.config();

>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Qpmyx5678',
  database: 'newark_it'
});

db.connect(err => {
  if (err) {
<<<<<<< HEAD
    console.error('Failed to connect to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
=======
    console.error(' Failed to connect to MySQL:', err);
  } else {
    console.log(' Connected to MySQL database.');
  }
>>>>>>> ca394d368c1e284a9a89aac5fa5c0ca55f824eb8
});

export default db;
