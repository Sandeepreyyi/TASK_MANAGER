import React, { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    if (savedCompletedTasks) {
      setCompletedTasks(savedCompletedTasks);
    }
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteCompletedTask = (id) => {
    const updatedCompletedTasks = completedTasks.filter((ct) => ct.id !== id);
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));
  };


  const filteredCompletedTasks = completedTasks.filter((ct) => {
    if (
      (searchQuery !== "" && !ct.task.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (priorityFilter !== "all" && ct.priority !== priorityFilter)
    ) {
      return false;
    }
    return true;
  });
  
  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };
  return (
    <div style={{ display: 'flex', margin: '0 2%',backgroundColor:'whitesmoke'}}>
      <Link href="/upcoming" color="primary">
        <ArrowBackIosNewSharpIcon />
        upcomming tasks
      </Link>
      <div style={{ margin: 'auto', width:'80%' }}>
        <h2>Completed Tasks</h2>
 


       
         <div style={{
  display: 'flex',
 
  width: 500,
  maxWidth: '100%',
  justifyContent: 'space-evenly',
  margin:'20px 30%',

 
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
        <table style={{ width: '80%', marginBottom: '20px', margin:'0 10%' }}>
  <thead>
    <tr>
      <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Task Name</th>
      <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Description</th>
      <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Priority</th>
      <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Deadline</th>
      <th style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Action</th>
    </tr>
  </thead>
          <tbody>
            {filteredCompletedTasks.map((ct) => (
              <tr key={ct.id}>
                <td 
                  style={{
                  textAlign:'left'
                  }}
                >{ct.task}</td>
                <td style={{
                  textAlign:'left'
                  }}>{ct.taskDescription}</td>
                <td style={{
                  textAlign:'left'
                  }}>{ct.priority}</td>
                <td style={{
                 
                  }}>{ct.deadline}</td>
                <td>


                  <Stack direction="row" spacing={1}>
      <Button style={{backgroundColor:'red',color:'white', marginLeft:'20%'}} onClick={() => deleteCompletedTask(ct.id)}>Delete
      </Button>
    </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link href="/overdue" color="primary">
        Overdue Tasks
          <KeyboardArrowRightSharpIcon />
          
        </Link>
      </div>
    </div>
  );
};

export default CompletedTasks;
