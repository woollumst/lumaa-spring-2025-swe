import express from "express";
import client from "../repository/db.js";
import { taskService } from "../service/taskService.js";
import authenticate from "../middleware/authMiddleware.js";

const taskRoutes = express.Router();

// /tasks endpoints
// todo: setup result object for task infrastructure so it can return success property?

// Get Task List
taskRoutes.get('/', authenticate, async (req, res) => {
    try{
        const result = taskService.getTasks();
        if(!result.success){
            res.status(404).json({ error: 'Failed to fetch task list' });
        }
        res.status(200).json({
            success: true,
            tasks: tasksmap(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                isComplete: task.isComplete,
                userId: task.userId
            }))
        }); // Fix?
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error getting task list', error: 'Failed to get tasks' });
    }
});

// Create a New Task
taskRoutes.post('', authenticate, async (req, res) => {
    const task = req.body;
    task.userId = req.user.id;
    try{
        const result = taskService.createTask(task);
        if(!result.success){
            res.status(404).json({ error : 'Failed to create task' });
        }
        res.status(201).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ succes: false, message: 'Error creating task', error: 'Failed to create task' });
    } 
});

// Update a Task by ID
taskRoutes.put('/:id', authenticate, async (req, res) => { 
    const task = req.body;
    task.id = req.params;
    try{
        const result = taskService.updateTask(task);
        if(!result.success){
            res.status(404).json({ error : 'Task not found' });
        }
        res.status(202).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : 'Failed to update task' });
    }
});

// Delete Task by ID
taskRoutes.delete('/:id', authenticate, async (req, res) => { 
    const { id } = req.params;
    try{
        const result = taskService.deleteTask(id);
        if(!result.success){
            res.status(404).json({ error : 'Task not found' });
        }
        res.status(202).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

export default taskRoutes;
