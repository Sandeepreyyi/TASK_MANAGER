import React, { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
const UpcomingTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    return savedCompletedTasks;
  });
  const [task, setTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState(() => {
    const savedOverdueTasks = JSON.parse(localStorage.getItem("overdueTasks")) || [];
    return savedOverdueTasks;
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [completionFilter, setCompletionFilter] = useState("all");
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    const savedOverdueTasks = JSON.parse(localStorage.getItem("overdueTasks")) || [];
    setTasks(savedTasks);
    setCompletedTasks(savedCompletedTasks);
    setOverdueTasks(savedOverdueTasks);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem("overdueTasks", JSON.stringify(overdueTasks));
  }, [overdueTasks]);
  
  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };


  const addTask = () => {
    if (task.trim() === "" || deadline === "") {
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();


    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    if (editMode) {
      const updatedTasks = tasks.map((t) =>
        t.id === editTaskId
          ? { ...t, task, taskDescription, priority, deadline }
          : t
      );
      setTasks(updatedTasks);
      setEditMode(false);
      setEditTaskId(null);
    } 
    else {
      const newTask = {
        id: tasks.length + 1,
        task,
        taskDescription,
        priority,
        deadline,
        done: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTask("");
    setTaskDescription("");
    setPriority("top");
    setDeadline("");
  };

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

  const moveToOverdue = (id) => {
    const taskToMove = tasks.find((t) => t.id === id);
    if (taskToMove) {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
      const updatedOverdueTasks = [...overdueTasks, { ...taskToMove, done: false }];
      setOverdueTasks(updatedOverdueTasks);
    }
  };

  const deleteTask = (id, isCompletedTask) => {
    if (isCompletedTask) {
      const updatedCompletedTasks = completedTasks.filter((ct) => ct.id !== id);
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));
    } else {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setTaskDescription(taskToEdit.taskDescription);
      setPriority(taskToEdit.priority);
      setDeadline(taskToEdit.deadline);
      setEditMode(true);
      setEditTaskId(id);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (
      searchQuery !== "" &&
      !t.task.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (priorityFilter !== "all" && t.priority !== priorityFilter) {
      return false;
    }
    if (
      completionFilter !== "all" &&
      (t.done !== (completionFilter === "completed"))
    ) {
      return false;
    }
    return true;
  });

  const filteredCompletedTasks = completedTasks.filter((ct) => {
    if (
      searchQuery !== "" &&
      !ct.task.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <Box style={{ display: 'flex', margin: 'auto', margin: '0 2%',backgroundColor:'whitesmoke'}}>
      <Link href="/overdue" color="primary">
        <ArrowBackIosNewSharpIcon />
        Overdue Tasks
      </Link>
      <div style={{ margin: '0 auto', width: '80%' }}>
        <h1 style={{color:'black'}}>Enter Tasks</h1>
        <div style={{ margin: 'auto',padding:'0 30%', border: '0.5px solid green',backgroundColor:'white'}}>
        <div style={{margin:'0' }}>
      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        marginTop:5,
        
      }}
    >
      <TextField fullWidth label="Enter Task" 
       type="text"
       id="task"
       placeholder="Enter task..."
       value={task}
       onChange={handleTaskChange} />
    </Box>
          <Box
  sx={{
    width: 500,
    maxWidth: '100%',
    marginTop:2,
  
  }}
>
  <TextField
    fullWidth
    label="Enter task description..."
    id="task-description"
    value={taskDescription}
    onChange={handleTaskDescriptionChange}
  />
</Box>

       
<div style={{
  display: 'flex',
  marginTop: '20px',
  width: 500,
  maxWidth: '100%',
  justifyContent: 'space-around',
  
}}>

    <Select
      labelId="demo-simple-select-label"
      id="priority"
      value={priority}
      label="Priority"
      onChange={handlePriorityChange}

    >
      <MenuItem value="top">Top Priority</MenuItem>
      <MenuItem value="middle">Middle Priority</MenuItem>
      <MenuItem value="low">Less Priority</MenuItem>
    </Select>
          <input
  type="date"
  id="deadline"
  value={deadline}
  onChange={handleDeadlineChange}
  style={{
    height: '40px', // Adjust the height as needed
    padding: '8px 12px', // Adjust the padding as needed
    fontSize: '1rem', // Adjust the font size as needed
    borderRadius: '4px', // Adjust the border radius as needed
    border: '1px solid #ccc', // Adjust the border style as needed
    
  }}
  
/>
</div>
    
        </div>
       

    <Box
  sx={{
    width: 500,
    maxWidth: '100%',
    marginTop:1,
  
  }}
>
<Button variant="contained" id="add-task" onClick={addTask}
          
          sx={{
            width: 500,
            maxWidth: '100%',
            marginTop:1,
          }}
          >
          {editMode ? "Update Task" : "Add Task"}
    </Button>

  </Box>

        <div style={{
  display: 'flex',
  marginTop: '20px',
  width: 500,
  maxWidth: '100%',
  justifyContent: 'space-around',
  
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
        </div>
        <h2>Upcoming Tasks</h2>   
<table style={{ width: '100%', marginBottom: '20px' ,backgroundColor:'whitesmoke' }}>
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
            {filteredTasks.map((t) => (
              !t.done && (
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.taskDescription}</td>
                  <td>{t.priority}</td>
                  <td>{t.deadline}</td>
                  <td>
                    {/* <button onClick={() => markDone(t.id)}>Done</button>
                    <button onClick={() => editTask(t.id)}>Edit</button>
                    <button onClick={() => deleteTask(t.id, false)}>Delete</button>
                    <button onClick={() => moveToOverdue(t.id)}>Overdue</button> */}
                     <Stack direction="row" spacing={1}>
       <Button style={{backgroundColor:'green',color:'white'}} onClick={() => markDone(t.id)}>Done
      </Button>
      <Button variant="contained" onClick={() => editTask(t.id)}>Edit
      </Button>
      <Button style={{backgroundColor:'yellow'}} onClick={() => moveToOverdue(t.id)}>Overdue
      </Button>
      <Button style={{backgroundColor:'red',color:'white'}} onClick={() => deleteTask(t.id, false)}>Delete
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
        
      </div>
      
      <div>
        <Link href="/completed" color="primary">
          Completed Tasks
          <KeyboardArrowRightSharpIcon />
        </Link>
      </div>
    </Box>
  );
};

export default UpcomingTasks;

