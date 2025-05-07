const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', require('./products'));
app.use('/api/users', require('./users'));
app.use('/api/orders', require('./orders'));

app.listen(3000, () => console.log('Server running on port 3000'));
