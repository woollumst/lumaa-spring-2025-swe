const { Client } = require('pg');

const client = new Client({
    user: 'wool',
    host: 'localhost',
    database: 'taskdb',
    password: '46wool0620',
    port: 5432,
});

client.connect().then(() => console.log('Connected to PostgreSQL')).catch(err => console.error('Connection error', err.stack));

client.query('SELECT * FROM taskdb', (req, res) => {
    if (err) throw err;
    console.log(res.rows);
    client.end();
});