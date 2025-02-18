const express = require('express');
const client = require('./controllers/db');

const app = express();
const PORT = process.env.PORT || 30000;

// Load and test postgreSQL database
app.get('/', async (req, res) => {
    try{
        const result = await client.query('SELECT NOW()'); //test
        res.send(`Database connected! Server time: ${result.rows[0].now}`);
    } catch (error) {
        res.status(500).send('Database connection failed');
    }
});

// /tasks           verify JWT upon running protected tasks
app.get('/tasks', (req, res) => {
    res.send('get /tasks');
});

app.post('/tasks', (req, res) => {
   res.send('post /tasks'); 
});

app.put('/tasks/:id', (req, res) => {
    res.send('put /tasks/:id');
});

app.delete('tasks/:id', (req, res) => {
    res.send('delete /tasks/:id');
});

// /user            make password hashed string
// register         use bcrypt for password hashing to store securely

// login            return JWT upon login


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});