import {useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask, updateTask } from "../services/api";
import { Task } from "../types";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');


    useEffect(() => {
        fetchTasks().then(setTasks).catch(error => console.error("Failed to get tasks", error));
    }, []);

    const CreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await createTask({ title, description }); //add userId to task fields here
            setTasks((prevTasks) => [...prevTasks, response]);
        } catch(error) {
            console.error('Failed to create task', error);
        }
    };

    return (
        <div>
            <h2>Tasks</h2>
            <form onSubmit={CreateTask}>
                <input 
                    type="text"
                    placeholder="Title"
                    value={ title }
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Description"
                    value={ description }
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {(!tasks) &&  
                    <li>Task List Empty</li>
                }
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.isCompleted ? "✅" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;