import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/LoginPage';
import DashboardPage from './pages/LoginPage';

function App() {

  return (
    <AuthProvider>
      <Router>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/dashboard" Component={DashboardPage} />
          <Redirect from="/" to="/login" />
      </Router>
    </AuthProvider>
  )
}

export default App
