import taskRepository from "../repository/taskRepository.js";

class taskService {
    constructor(){}
    getTasks() {
        return taskRepository.getTasks();
    }
    
    createTask (task) {
        const {title, description, isComplete, userId} = task;
        return await taskRepository.createTask(title, description, isComplete, userId);
    }
    
    updateTask (task) {
        const {id, title, description, isComplete, userId } = task;
        return await taskRepository.updateTask(id, title, description, isComplete);
    }
    
    deleteTask (id) {
        taskRepository.deleteTask(id);
    }
}

export default taskService;