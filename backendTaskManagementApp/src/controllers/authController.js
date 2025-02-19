import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import client from "../repository/db.js";
import authService from "../service/authService.js";

dotenv.config();

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
    const { username, password } = req.body(); // accept user input for username/password
    
    try{
        const result = authService.authRegister(username, password); // call service layer to handle registration

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] }); // registration successful
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

authRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body; //accept user input for username/password

    try{
        const result = authService.checkUsername(username);
        const user = result.rows[0]; // pull user from sql query
        if(!user){ // handle error for wrong username
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const isMatch = authService.checkPassword(username, password);
        if(!isMatch){ // handle error for wrong password
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' }); //generate JWT
        res.json({ message: 'Login successful', token }); // complete login, send token
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

export default authRoutes;
    