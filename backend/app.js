const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/userRoutes'));

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
