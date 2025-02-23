import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:5000/";

export const fetchTasks = async (): Promise<Task[]> => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_URL}tasks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if(!data.success){
        throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    return data.tasks;
}; //fix

export const createTask = async (task: Partial<Task>): Promise<Task> => {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${API_URL}tasks`, task, 
        { headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            }});
    return response.data;
};

export const updateTask = async (task: Partial<Task>): Promise<Task> => {
    const token = localStorage.getItem("authToken");
    const response = await axios.patch(`${API_URL}tasks/:${task.id}`, task, 
        { headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            }});
    return response.data;
};

export const deleteTask = async (task: Partial<Task>) => { // might need to change this
    const token = localStorage.getItem("authToken");
    const response = await axios.delete(`${API_URL}tasks/:${task.id}`, 
        { headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            }});
    return response.data;
};

//Users
export const loginUser = async (credentials: { username: string, password: string }) => {
    const response = await axios.post(`${API_URL}auth/login`, credentials);
    return response.data.token;
}

export const registerUser = async (credentials: { username: string, password: string }) => {
    const response = await axios.post(`${API_URL}auth/register`, credentials);
    return response.data.token;
}