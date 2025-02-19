import client from "./db.js";

class authRepository {
    constructor(){}
    
    register (username, hashedPassword) {
        return client.query( // register user to user database
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [ username, hashedPassword ]
        );
    }

    async getByUsername (username) {  // pull user from db to handle login
        return await client.query('SELECT * FROM users WHERE username=$1', [username]);
    }
}

export default authRepository;