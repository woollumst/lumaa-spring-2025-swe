import client from "./db.js";
import { authRepository } from "./authRepository.js";

export const taskRepository = {
    async getTasks(){
        try{
            const result = await client.query(
                'SELECT * FROM tasks'
            );
            return result.rows;
        } catch(error){
            console.error('Database error, failed to get tasks');
            throw new Error('Database get tasks query failed');
        }
    },
    
    async createTask(title, description, username){
        const idobj = await authRepository.getIDByUsername(username);
        const userId = idobj.id;
        try{
            const result = await client.query( // insert task into database
                'INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *',
                [ title, description, userId ]
            );
            return result.rows[0];
        } catch(error){
            console.error('Database error, failed to create tasks');
            throw new Error('Database create task query failed');
        }
    },
    
    async updateTask(id, title, description, isComplete) {
        try{
            const result = await client.query( // update task in database
                'UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 RETURNING *',
                [ title, description, isComplete, id ]
            );
            return result.rows[0];
        } catch(error){
            console.error('Database error, failed to update task');
            throw new Error('Database update task query failed');
        }
    },
    
    async deleteTask(id) {
        try{
            await client.query(
                'DELETE FROM tasks WHERE id=$1',
                [ id ]
            );
        } catch(error){
            console.error('Database error, failed to delete task');
            throw new Error('Database delete task query failed');
        }
    }
};