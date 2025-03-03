import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authRepository } from "../repository/authRepository.js";

dotenv.config();

export const authService = {
    async authRegister(username, password) {
        try{
            const hashedPassword = await bcrypt.hash(password, 10); // use bcrypt to encrypt password
            const user = await authRepository.register(username, hashedPassword);
            const token = await this.getToken(user);
            return {
                success: false,
                message: 'Registration successful',
                user: {
                    id: user.id,
                    username: user.username,
                },
                token
            };
        } catch (error) {
            console.error('Registration error: ', error);
            return { success: false, message: 'Internal server error' };
        }
    },
    
    async checkPassword(user, password){ // check password through bcrypt
        return await bcrypt.compare(password, user.password); 
    },

    getToken(user){
        return jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        ); //generate JWT
    },

    async handleLogin(username, password) {
        try{
            const user = await authRepository.getByUsername(username);
            // console.log(user); //debug code, passed
            if(!user){ // handle error for wrong username
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            
            const isMatch = await this.checkPassword(user, password);
            if(!isMatch){ // handle error for wrong password
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            const token = await this.getToken(user);
            //console.log(token); //debug code, passed
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