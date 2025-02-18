import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import client from "../db.js";

dotenv.config();

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
    const { username, password } = req.body(); // accept user input for username/password
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10); // use bcrypt to encrypt password
        const result = client.query( // register user to user database
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [ username, hashedPassword ]
        );
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] }); // registration successful
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

authRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body; //accept user input for username/password

    try{
        const result = await client.query('SELECT * FROM users WHERE username=$1', [username]); // search db for user with username
        const user = result.rows[0]; // pull user from sql query

        if(!user){ // handle error for wrong username
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password); // check password through bcrypt
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
    