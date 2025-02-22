import express from "express";
import { authService } from "../service/authService.js";

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
    const { username, password } = req.body; // accept user input for username/password
    
    console.log('attempting to register...');

    try{ // result = { success, message, user, token }
        const result = authService.authRegister(username, password); // call service layer to handle registration
        res.status(201).json({ result }); // registration successful
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
    }
});

authRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body; //accept user input for username/password

    try{ // result = { success, message, user, token }
        const resilt = authService.handleLogin(username, password); // handle login, generate token upon success
        res.json({ result }); // complete login, send token
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
});

export default authRoutes;
    