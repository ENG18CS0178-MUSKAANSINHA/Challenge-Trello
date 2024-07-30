import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState('');
  const [column, setColumn] = useState('To Do'); // Default column

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/tasks', { title, column });
    setTitle('');
    refreshTasks(); // Refresh task list after adding a task
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={column} onChange={(e) => setColumn(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
