import {useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask, updateTask } from "../services/api";
import { Task } from "../types";
import { useAuth } from "../context/AuthProvider";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');
    const [toLogout, setToLogout ] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        if(token){
            fetchTasks(token).then(setTasks).catch(error => console.error("Failed to get tasks", error));
        } else {
            console.error("No token found (Get Tasks)");
        }
    }, []);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if(token){
        try{
            const response = await createTask({ title, description }, token);
            setTasks([...tasks, response]);
        } catch(error) {
            console.error('Failed to create task', error);
        }
        }else{
            console.error("No token found (Create Task)");
        }
    };

    if (toLogout){
        useAuth().logout();
    }

    return (
        <div>
            <button onClick={() => setToLogout(true)}>Logout</button>
            <h2>Tasks</h2>
            <form onSubmit={handleCreateTask}>
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
                { tasks.length === 0 &&  <p>Task List Empty</p> }
                { tasks.length > 0 && (
                    tasks.map((task) => (
                        <li key={task.id}>
                            {task.title} - {task.isCompleted ? "✅" : "❌"}
                        </li>
                )))}
            </ul>
        </div>
    );
};

export default TaskList;