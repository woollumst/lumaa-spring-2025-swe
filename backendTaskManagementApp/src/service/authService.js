import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authRepository from "../repository/authRepository.js";

dotenv.config();

class authService{
    async authRegister (username, password) {
        const hashedPassword = await bcrypt.hash(password, 10); // use bcrypt to encrypt password
        return authRepository.register(username, hashedPassword);
    }
    
    checkUsername (username) {
        return authRepository.getByUsername(username);
    }
    
    async checkPassword(username, password){
        return await bcrypt.compare(password, user.password); // check password through bcrypt
    }
}
export default authService;