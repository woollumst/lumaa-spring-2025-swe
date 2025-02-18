const express = require('express');
const app = express();

const PORT = process.env.PORT || 30000;

app.get('/', (req, res) => {
    res.send('Task Management App');
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