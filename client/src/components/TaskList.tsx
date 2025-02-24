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
    const [isEditing, setIsEditing] = useState<Task | null>(null);
    const [toDelete, setToDelete] = useState<Task | null>(null);

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
            const response = await createTask({ title, description }, token); // returns { task }
            setTasks([...tasks, response]); // adds new task to task list
        } catch(error) {
            console.error('Failed to create task', error);
        }
        }else{
            console.error("No token found (Create Task)");
        }
    };

    const handleEditClick = (task: Task) => {
        setIsEditing({ ...task });
    }

    if (toLogout){
        useAuth().logout();
    }

    if(toDelete){
        if(token)
            deleteTask(toDelete, token);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== toDelete.id));
        setToDelete(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!isEditing) return;
        setIsEditing({ ...isEditing, [e.target.name]: e.target.value });
    }

    const toggleComplete = () => {
        if (!isEditing) return;
        setIsEditing({ ...isEditing, isCompleted: !isEditing.isCompleted})
    }
    
    const handleUpdate = async () => {
        if(!isEditing) return;

        try{
            if(token) {
                await updateTask(isEditing, token);

                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        (task.id === isEditing.id ? isEditing : task)));
            }
            setIsEditing(null);
        } catch (error) {
            console.error("Failed to update task: ", error);
        }
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
                <textarea 
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
                            {isEditing?.id === task.id ? ( 
                                <>
                                    <input
                                        type="text"
                                        name="title"
                                        value={isEditing.title}
                                        onChange={handleChange}
                                    />
                                    <textarea
                                        name="description"
                                        value={isEditing.description}
                                        onChange={handleChange}
                                    />
                                    <label>
                                        <input 
                                            type="checkbox"
                                            checked={isEditing.isCompleted}
                                            onChange={toggleComplete}
                                        />
                                        Completed
                                    </label>
                                    <button onClick={handleUpdate}>Save</button>
                                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                                </>
                            ) : (
                            <>
                                {task.title} - {task.isCompleted ? "✅" : "❌"}
                                <ul>
                                    <button onClick={() => handleEditClick(task)}>Edit</button>
                                    <button onClick={() => setToDelete(task)}>Delete</button>
                                </ul>
                            </>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskList;