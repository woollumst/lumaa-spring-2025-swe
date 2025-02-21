import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:5000/";

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await axios.get(`#{API_URL}/tasks`);
    return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
};

export const updateTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/tasks`, task);
    return response.data;
};

//Users
export const loginUser = async (credentials: { email: string, password: string }) => {
    const reponse = await axios.post(`$API_URL}/login`, credentials);
    return response.data.token;
}