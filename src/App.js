import Header from "./component/Header";
import { useState } from "react";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
  ])

  // Add Task
  const addTask = (task) => {
    // add to state
    // create your own id, if not using server

    const id = Math.floor(Math.random() * 1000) + 1

    // this takes the values from the input (task) and adds it to the object with an id
    const newTask = {id, ...task}
    // this adds newTask into the existing state
    setTask([...tasks, newTask])
  }
  // since we don't have a store, we can just pass the function
  // down to the grandchild, task.js
  // Delete Task
  const deleteTask = (id) => {
    // console.log('delete', id);
    setTask(tasks.filter((task) => task.id !== id))
  }
  // Toggle Reminder
  const toggleReminder = (id) => {
    // console.log(id)
    setTask(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  // const name = 'Brad'
  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} 
      title="1" showAdd={showAddTask}/>
      {/* shorter way of doing a ternary */}
     { showAddTask && <AddTask onAdd={addTask}/> }
     {tasks.length > 0 ? <Tasks tasks={tasks} 
     onToggle={toggleReminder}
     onDelete={deleteTask}/> : "No Tasks to show"}
   
      {/* <h1 style={{color:"Red", backgroundColor:"black"}}>Hello from React</h1> */}
      {/* <h1>Hello i'm {name}</h1> */}
    </div>
  );
}

export default App;
