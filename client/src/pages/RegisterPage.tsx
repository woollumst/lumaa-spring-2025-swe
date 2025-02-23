import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { registerUser } from '../services/api';

const RegisterPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toLogin, setToLogin] = useState(false);

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const token = await registerUser({ username, password });
            login(token);
            navigate('/');
        } catch(error) {
            console.error('Registration failed', error);
        }
    };

    if (toLogin) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <input 
                    type="text"
                    placeholder="Username"
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
                <button type="submit">Register</button>
            </form>
            <br />
            <p>Existing Account? Login here:</p>
            <button onClick={() => setToLogin(true)}>Login to Account</button>
        </div>
    )
}

export default RegisterPage;