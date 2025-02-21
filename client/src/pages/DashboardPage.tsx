import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import TaskList from '../components/TaskList'

const DashboardPage = () => {
    const { isAuthenticated } = useContext(AuthContext) || { isAuthenticated: false };

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <TaskList />
        </div>
    )
}

export default DashboardPage;