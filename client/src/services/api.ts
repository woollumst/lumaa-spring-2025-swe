import axios from "axios";
import { useState, useEffect } from "react";
import { Task } from "../types";

const API_URL = "http://localhost:5000/";

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks`);
    return response;
}; //fix

export const createTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
};

export const updateTask = async (task: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/tasks`, task);
    return response.data;
};

//Users
export const loginUser = async (credentials: { username: string, password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data.token;
}

export const registerUser = async (credentials: { username: string, password: string }) => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data.token;
}