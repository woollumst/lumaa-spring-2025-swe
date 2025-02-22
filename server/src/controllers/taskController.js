import express from "express";
import client from "../repository/db.js";
import { taskService } from "../service/taskService.js";
import authenticate from "../middleware/authMiddleware.js";

const taskRoutes = express.Router();

// /tasks           verify JWT upon running protected tasks

//get task list
taskRoutes.get('/', authenticate, async (req, res) => {
    try{
        const result = await taskService.getTasks();
        res.json(result); // Fix?
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get tasks' });
    }
});

//create a new task
taskRoutes.post('', authenticate, (req, res) => {
    const task = req.body;
    try{
        const result = taskService.createTask(task);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    } 
});

//update a task
taskRoutes.put('/:id', authenticate, (req, res) => { 
    const { id } = req.params;
    const task = req.body;
    try{
        const updatedTask = taskService.updateTask(id, task);
        if(!updatedTask){
            res.status(404).json({ error : 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : 'Failed to update task' });
    }
});

taskRoutes.delete('/:id', authenticate, (req, res) => { 
    const { id } = req.params;
    try{
        const deletedTask = taskService.deleteTask(id);
        if(!deletedTask){
            res.status(404).json({ error : 'Task not found' });
        }
        res.json(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

export default taskRoutes;