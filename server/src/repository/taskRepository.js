import clients from "./db.js";

class taskRepository {
    constructor(){}
    getTasks(){
        return client.query(
            'SELECT * FROM tasks'
        );
    }
    
    createTask(title, description, isComplete, userId){
        return client.query( // insert task into database
            'INSERT INTO tasks (title, description, isComplete, userId) VALUES ($1, $2, $3, $4) RETURNING *',
            [ title, description, isComplete, userId ]
        );
    }
    
    updateTask(id, title, description, isComplete) {
        return client.query( // update task in database
            'UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 RETURNING *',
            [ title, description, isComplete, id ]
        );
    }
    
    deleteTask(id) {
        client.query(
            'DELETE FROM tasks WHERE id = $1',
            [ id ]
        );
    }
}

export default taskRepository;