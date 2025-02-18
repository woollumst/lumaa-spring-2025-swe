import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import client from "../db.js";

dotenv.config();

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
    const { username, password } = req.body();
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = client.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [ username, hashedPassword ]
        );
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

authRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    //finish
});

export default authRoutes;
    