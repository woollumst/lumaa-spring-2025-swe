import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:5000/";

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks`);
    if(!response.ok){
        throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    return response.data;
}; //fix

export const createTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.post(`${API_URL}tasks`, task);
    return response.data;
};

export const updateTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`${API_URL}tasks/:${task.id}`, task);
    return response.data;
};

export const deleteTask = async (task: Partial<Task>): Promise<Task> => { // might need to change this
    const response = await axios.delete(`${API_URL}tasks/:${task.id}`, task);
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