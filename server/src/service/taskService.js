import { taskRepository } from "../repository/taskRepository.js";

export const taskService = {
    async getTasks() {
        try{
            const result = await taskRepository.getTasks();
            return {
                success: true,
                message: 'Fetch tasks successful',
                tasks: result,
            };
        } catch (error) {
            console.error('getTasks error: ', error);
            return { success: false, message: 'Internal server error' };
        }
    },

    createTask (task) {
        try{
            const {title, description, isComplete, userId} = task;
            const result = taskRepository.createTask(title, description, isComplete, userId);
            return {
                success: true,
                message: 'Create task successful',
            }; 
        } catch (error) {
            console.error('createTask error: ', error);
            return { success: false, message: 'Internal server error' };
        }
    },
    
    async updateTask (task) {
        try{
            const {id, title, description, isComplete, userId } = task;
            const result =  await taskRepository.updateTask(id, title, description, isComplete);
            return {
                success: true,
                message: 'Update task successful',
            };
        } catch (error) {
            console.error('updateTask error: ', error);
            return { success: false, message: 'Internal server error' };
        }
    },
    
    deleteTask (id) {
        try{
            taskRepository.deleteTask(id);
            return {
                success: true,
                message: 'Delete task successful',
            };
        } catch (error) {
            console.error('deleteTask error: ', error);
            return { success: false, message: 'Internal server error' };
        }
    }
};