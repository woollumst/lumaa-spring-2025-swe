import {useEffect, useState } from "react";
import { fetchTasks } from "../services/api";
import { Task } from "../types";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks().then(setTasks);
    }, []);

    return (
        <div>
            <h2>Tasks</h2>
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