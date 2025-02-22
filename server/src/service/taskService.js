import { taskRepository } from "../repository/taskRepository.js";

export const taskService = {
    getTasks() {
        return taskRepository.getTasks();
    },
    
    createTask (task) {
        const {title, description, isComplete, userId} = task;
        return taskRepository.createTask(title, description, isComplete, userId);
    },
    
    async updateTask (task) {
        const {id, title, description, isComplete, userId } = task;
        return await taskRepository.updateTask(id, title, description, isComplete);
    },
    
    deleteTask (id) {
        taskRepository.deleteTask(id);
    }
};