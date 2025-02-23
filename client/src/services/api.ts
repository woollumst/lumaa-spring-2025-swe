import axios from "axios";
import { Task } from "../types";
import { useAuth } from "../context/AuthProvider";

const API_URL = "http://localhost:5000/";

export const fetchTasks = async (token: string): Promise<Task[]> => {
    console.log("Token before req: ", token);
    const response = await axios.get(`${API_URL}tasks`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });
    const data = await response.data;
    if(data.success){
        console.log("Task list returned, bad formatting likely");
    }
    if(!data.success){
        throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    return data.tasks;
}; //fix

export const createTask = async (task: Partial<Task>, token: string): Promise<Task> => {
    const response = await axios.post(`${API_URL}tasks`, task, 
        { headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            }});
    return response.data;
};

export const updateTask = async (task: Partial<Task>, token: string): Promise<Task> => {
    const response = await axios.patch(`${API_URL}tasks/:${task.id}`, task, 
        { headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            }});
    return response.data;
};

export const deleteTask = async (task: Partial<Task>, token: string) => { // might need to change this
    const response = await axios.delete(`${API_URL}tasks/:${task.id}`, 
        { headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            }});
    return response.data;
};

//Users
export const loginUser = async (credentials: { username: string, password: string }) => {
    const result = await axios.post(`${API_URL}auth/login`, credentials);
    return result.data; // token
}

export const registerUser = async (credentials: { username: string, password: string }) => {
    const response = await axios.post(`${API_URL}auth/register`, credentials);
    return response.data.token;
}