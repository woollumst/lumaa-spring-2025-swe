import {useEffect, useState } from "react";
import { fetchTasks } from "../services/api";
import { Task } from "../types";
import taskServic

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks().then(setTasks).catch(error => console.error("Failed to get tasks", error));
    }, []);

    const CreateTask = () => {
        
    }

    return (
        <div>
            <h2>Tasks</h2>
            <form onSubmit={CreateTask}>
                <input 
                    type="text"
                    placeholder="Title"
                    value={ title }
                />
                <input 
                    type="text"
                    placeholder="Description"
                    value={ description }
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
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