import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import client from "../repository/db.js";
import authenticate from "../middleware/authMiddleware.js";

dotenv.config();

const taskRoutes = express.Router();

// /tasks           verify JWT upon running protected tasks

//get task list
taskRoutes.get('/tasks', authenticate, async (req, res) => {
    try{
        const result = await client.query('SELECT * FROM tasks WHERE username=$1', [username]); //might have to fix how i'm doing this variable?
        //return task array for the React app to process and display
        // res.json({ result }); // Fix
    } catch (error) {
        res.status(500).send('Failed to get tasks');
    }
});

//create a new task
taskRoutes.post('/tasks', authenticate, (req, res) => {
    res.json({ message: ' you have access to this protected route', user: req.user }); 
});

//update a task
taskRoutes.put('/tasks/:id', authenticate, (req, res) => { 
    res.json({ message: ' you have access to this protected route', user: req.user });
});

taskRoutes.delete('tasks/:id', authenticate, (req, res) => { 
    res.json({ message: ' you have access to this protected route', user: req.user });
});

export default taskRoutes;