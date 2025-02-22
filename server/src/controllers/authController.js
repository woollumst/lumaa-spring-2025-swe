import express from "express";
import authService from "../service/authService.js";

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body; // accept user input for username/password
    
    console.log('attempting to register...');

    try{
        const result = authService.authRegister(username, password); // call service layer to handle registration
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] }); // registration successful
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

authRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body.json(); //accept user input for username/password

    try{
        const token = authService.handleLogin(username, password); // handle login, generate token upon success
        res.json({ message: 'Login successful', token }); // complete login, send token
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

export default authRoutes;
    