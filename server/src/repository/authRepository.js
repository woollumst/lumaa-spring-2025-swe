import client from "./db.js";

export const authRepository = {
    register (username, hashedPassword) {
        try{
            const result = client.query( // register user to user database
                'INSERT INTO userdb (username, password) VALUES ($1, $2) RETURNING *',
                [ username, hashedPassword ]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Database error');
            throw new Error('Database query failed');
        }
    },

    async getByUsername (username) {  // pull user from db to handle login
        try{
            const result = await client.query(
                'SELECT username, password FROM userdb WHERE username=$1', 
                [username]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Database error');
            throw new Error('Database query failed');
        }
    }
};