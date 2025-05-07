const db = require('./connect');

exports.getProducts = (req, res) => {
    db.query('SELECT * FROM Product', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};
