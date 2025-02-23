import { useContext } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import TaskList from '../components/TaskList'

const DashboardPage = () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <TaskList />
        </div>
    )
}

export default DashboardPage;