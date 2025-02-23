import client from "./db.js";
import { taskRepository } from "./taskRepository.js";

export const authRepository = {
    register (username, hashedPassword) {
        try{
            const result = client.query( // register user to user database
                'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
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
                'SELECT username, password FROM users WHERE username=$1', 
                [username]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Database error');
            throw new Error('Database query failed');
        }
    },

    async getIDByUsername (username) {
        try{
            const result = await client.query(
                'SELECT id FROM users WHERE username=$1',
                [username]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Database error');
            throw new Error('Database query failed');
        }
    }
};