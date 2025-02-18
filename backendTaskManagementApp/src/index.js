import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import client from "./db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try{
        const result = await client.query('SELECT NOW()'); //test
        res.send(`Database connected! Server time: ${result.rows[0].now}`);
    } catch (error) {
        res.status(500).send('Database connection failed');
    }
});

// /tasks           verify JWT upon running protected tasks
/*
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
*/


// /user            make password hashed string
// register         use bcrypt for password hashing to store securely

// login            return JWT upon login
app.post('/api/auth/login', (req, res) => {
   const { username, password } = req.body;
   if (username === "admin" && password === "password"){
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
   } else {
      res.status(401).json({ message: "Invalid credentials" });
   }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});