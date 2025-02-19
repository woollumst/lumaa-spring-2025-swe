import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authRepository from "../repository/authRepository.js";

dotenv.config();

async function authRegister (username, password) {
    const hashedPassword = await bcrypt.hash(password, 10); // use bcrypt to encrypt password
    return authRepository.register(username, hashedPassword);
    /*const result = client.query( // register user to user database
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [ username, hashedPassword ]
    );*/
}

function checkUsername (username) {
    return authRepository.getByUsername(username);
}

async function checkPassword(username, password){
    return await bcrypt.compare(password, user.password); // check password through bcrypt
}

export default authService;