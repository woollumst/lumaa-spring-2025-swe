import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api';

const LoginPage = () => {
    const { login } = useContext(AuthContext) || { login: () => {} };
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toRegister, setToRegister] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const token = await loginUser({ username, password });
            login(token);
            navigate('/');
        } catch(error) {
            console.error('Login failed', error);
        }
    };

    if (toRegister) {
        return <Navigate to="/register" />
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <br />
            <p>New? Register account here:</p>
            <button onClick={() => setToRegister(true)}>Register New Account</button>
        </div>
    )
}

export default LoginPage;