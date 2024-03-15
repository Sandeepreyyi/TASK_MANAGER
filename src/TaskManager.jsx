// TaskManager.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpcomingTasks from './components/UpcomingTasks';
import OverdueTasks from './components/OverdueTasks';
import CompletedTasks from './components/CompletedTasks';
import './taskmanager.css';
const TaskManager = () => {
  return (
    <div style={{}}>
        <h1 style={{color:'red'}}>TASK MANAGER</h1>
      <Router>
        <Routes>
        <Route index element={<UpcomingTasks />} />
          <Route path="/upcoming" element={<UpcomingTasks />} />
          <Route path="/overdue" element={<OverdueTasks />} />
          <Route path="/completed"element={<CompletedTasks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default TaskManager;
  
