import client from "./db.js";

export const authRepository = {
    constructor(){}
    
    register (username, hashedPassword) {
        return client.query( // register user to user database
            'INSERT INTO userdb (username, password) VALUES ($1, $2) RETURNING *',
            [ username, hashedPassword ]
        );
    }

    async getByUsername (username) {  // pull user from db to handle login
        return await client.query('SELECT * FROM userdb WHERE username=$1', [username]);
    }
};