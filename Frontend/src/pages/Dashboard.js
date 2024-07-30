import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <TaskForm refreshTasks={() => fetchTasks()} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default Dashboard;

