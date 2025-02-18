import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import client from "./db.js";
import authRoutes from "./routes/auth.js";
import authenticate from "./middleware/authMiddleware.js";

dotenv.config(); //env variables
const app = express(); //load express
const PORT = process.env.PORT || 5000; //grab port variable from env if available
app.use(express.json()); // load json compatibility
app.use(cors()); // load cors obj
app.use("/api/auth", authRoutes); // login, register routing and token dispersal handled in auth.js

app.get('/', async (req, res) => { //home page
    try{ // test database connection?
        const result = await client.query('SELECT NOW()'); //test
        res.send(`Database connected! Server time: ${result.rows[0].now}`);
    } catch (error) {
        res.status(500).send('Database connection failed');
    }
});

app.get('/api/protected', authenticate, (req, res) => { // Test endpoint to test JWT authentication
    res.json({ message: ' you have access to this protected route', user: req.user });
});

// /tasks           verify JWT upon running protected tasks

//get task list
app.get('/tasks', authenticate, async (req, res) => {
    try{
        const result = await client.query('SELECT * FROM tasks WHERE username=$1', [username]); //might have to fix how i'm doing this variable?
        //return task array for the React app to process and display
        // res.json({ result }); // Fix
    } catch (error) {
        res.status(500).send('Failed to get tasks');
    }
});

//create a new task
app.post('/tasks', authenticate, (req, res) => {
   res.send('post /tasks'); 
});

//update a task
app.put('/tasks/:id', authenticate, (req, res) => { 
    res.send('put /tasks/:id');
});

app.delete('tasks/:id', authenticate, (req, res) => { 
    res.send('delete /tasks/:id');
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});