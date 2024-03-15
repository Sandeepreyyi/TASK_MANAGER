import React, { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const OverdueTasks = () => {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
 
    const [tasks, setTasks] = useState(() => {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      return savedTasks;
    });
    const [completedTasks, setCompletedTasks] = useState(() => {
      const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
      return savedCompletedTasks;
    });

  useEffect(() => {
    const savedOverdueTasks = JSON.parse(localStorage.getItem("overdueTasks"));
    if (savedOverdueTasks) {
      setOverdueTasks(savedOverdueTasks);
    }
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteOverdueTask = (id) => {
    const updatedOverdueTasks = overdueTasks.filter((t) => t.id !== id);
    setOverdueTasks(updatedOverdueTasks);
    localStorage.setItem("overdueTasks", JSON.stringify(updatedOverdueTasks));
  };

  const filteredOverdueTasks = overdueTasks.filter((t) => {
    if (
      searchQuery !== "" &&
      !t.task.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };


  const editTask = (id) => {
    const updatedTasks = overdueTasks.map((task) =>
      task.id === id ? { ...task, editing: true } : task
    );
    setOverdueTasks(updatedTasks);
  };
  
  const saveEditedTask = (id) => {
    const updatedTasks = overdueTasks.map((task) =>
      task.id === id ? { ...task, editing: false } : task
    );
    setOverdueTasks(updatedTasks);
    localStorage.setItem("overdueTasks", JSON.stringify(updatedTasks));
  };
  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };
  return (
    <div style={{ display: 'flex', margin: '0 2%',backgroundColor:'whitesmoke' }}>
      <Link href="/completed" color="primary">
        <ArrowBackIosNewSharpIcon />
        Completed Tasks
      </Link>
      <div style={{ margin: 'auto', width:'80%' }}>
        
       
        
        <h2>Overdue Tasks</h2> 
        <div style={{
  display: 'flex',
 
  width: 500,
  maxWidth: '100%',
  justifyContent: 'space-evenly',
  margin:'20px 30%',
  backgroundColor:'white'


 
}}>
        
  
    <TextField
    label="Enter task"
    type="text"
    id="search"
    placeholder="Search tasks..."
    value={searchQuery}
    onChange={handleSearchQueryChange}
  />
          <Select
      labelId="demo-simple-select-label"
      id="priority-filter"
      value={priorityFilter}
      label="Priority"
      onChange={handlePriorityFilterChange}

    >
      <MenuItem value= "all">All Priorites</MenuItem>
      <MenuItem value="top">Top Priority</MenuItem>
      <MenuItem value="middle">Middle Priority</MenuItem>
      <MenuItem value="low">Less Priority</MenuItem>
    </Select>

  


        </div>
        
        
        <table style={{ width: '80%', marginBottom: '20px', margin:'0 10%'}}>
  <thead>
    <tr>
      <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Task Name</th>
      <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Description</th>
      <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Priority</th>
      <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Deadline</th>
      <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Action</th>
    </tr>
  </thead>
          <tbody>
            {filteredOverdueTasks.map((t) => (
              !t.done && (
                <tr key={t.id}>
                  <td 
                  style={{
                  textAlign:'left'
                  }}
                >{t.task}</td>
                <td style={{
                  textAlign:'left'
                  }}>{t.taskDescription}</td>
                <td style={{
                  textAlign:'left'
                  }}>{t.priority}</td>
                <td style={{
                 
                  }}>{t.deadline}</td>
                <td>
                    <Stack direction="row" spacing={1}>
      <Button style={{backgroundColor:'red',color:'white'}} onClick={() => deleteOverdueTask(t.id)}>Delete
      </Button>
    </Stack>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link href="/upcoming" color="primary">
          UpcommingTasks
          <KeyboardArrowRightSharpIcon />
        </Link>
      </div>
    </div>
  );
};

export default OverdueTasks;


