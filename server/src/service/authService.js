import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authRepository } from "../repository/authRepository.js";

dotenv.config();

export const authService = {
    async authRegister(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10); // use bcrypt to encrypt password
        return authRepository.register(username, hashedPassword);
    },
    
    async checkPassword(user, password){ // check password through bcrypt
        return await bcrypt.compare(password, user.password); 
    },

    getToken(user){
        return jwt.sign(
            { userId: user.id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        ); //generate JWT
    },

    handleLogin(username, password) {
        try{
            const user = authRepository.getByUsername(username);
            if(!user){ // handle error for wrong username
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            
            const isMatch = this.checkPassword(user, password);
            if(!isMatch){ // handle error for wrong password
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            const token = this.getToken(user);
            return {
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username
                },
                token
            };
        } catch (error) {
            console.error('Login error: ', error);
            return { success: false, message: 'Internal server error' };
        }
    }
};