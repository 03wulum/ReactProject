import Header from "./component/Header";
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "./component/Footer";
import { useState, useEffect } from "react";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";
import About from "./component/About";
import TaskDetails from "./component/TaskDetails";
import NotFound from "./component/NotFound";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // do something when the page loads
  useEffect(() => {
    const getTasks = async () => {
      // fetch returns a promise
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    //call it
    getTasks();
  }, 
  //dependency array, value that changes triggering a run would be passed hereE
  [])

  const fetchTasks = async () => {
    // fetch returns a promise
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  }

  const fetchTask = async (id) => {
    // fetch returns a promise
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  // Add Task
  const addTask = async (task) => {
    // add to state
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()
    

    setTasks([...tasks, data])

    // this takes the values from the input (task) and adds it to the object with an id
    // const newTask = {id, ...task}
    // this adds newTask into the existing state
    // setTasks([...tasks, newTask])
  }
  // since we don't have a store, we can just pass the function
  // down to the grandchild, task.js
  // Delete Task
  const deleteTask = async (id) => {
    // console.log('delete', id);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const udpatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder};
    //update request
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{ 
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(udpatedTask)
    })

    const data = await res.json()

    // console.log(id)
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  // const name = 'Brad'
  return (
    <Router>
   
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} 
      title="1.0" showAdd={showAddTask}/>
      {/* shorter way of doing a ternary */}
     <Routes>
       //USE ELEMENT INSTEAD OF COMPONENT IN router v6
       // routes must wrap route
     <Route path="/" element={  
     <> 
       { showAddTask && <AddTask onAdd={addTask}/> }
     {tasks.length > 0 ? <Tasks tasks={tasks} 
     onToggle={toggleReminder}
     onDelete={deleteTask}/> : "No Tasks to show"}
       </>
      }
      />
     <Route path="/about" element={<About/>} />
     <Route path="/NotFound" element={<NotFound/>} />
     <Route path="/task/:id" element={<TaskDetails/>} /></Routes>
      <Footer/>
      {/* <h1 style={{color:"Red", backgroundColor:"black"}}>Hello from React</h1> */}
      {/* <h1>Hello i'm {name}</h1> */}
    </div></Router>
  );
}

export default App;
