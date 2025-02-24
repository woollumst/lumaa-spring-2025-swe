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

    async createTask (task) {
        try{
            const {title, description, userId } = task;
            const result = await taskRepository.createTask(title, description, userId);
            if(!result){
                return {
                    success: false,
                    message: 'Create task failed',
                };
            }
            return {
                success: true,
                message: 'Create task successful',
                task: result,
            }; 
        } catch (error) {
            console.error('createTask error: ', error);
            return { success: false, message: 'Internal server error' };
        }
    },
    
    async updateTask (task) {
        try{
            const {id, title, description, isCompleted, userId } = task;
            const result =  await taskRepository.updateTask(id, title, description, isCompleted);
            if(!result){
                return {
                    success: false,
                    message: 'Update task failed',
                };
            }
            return {
                success: true,
                message: 'Update task successful',
                task: result,
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