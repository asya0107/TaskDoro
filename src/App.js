import './App.css';
import React,{ useState, useEffect } from "react";

import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newTitle,setNewTitle]= useState("");
  const [timeAlotted, setTimeAlotted] = useState(0);
  const [tasks,setTasks] = useState([]);
  const taskCollectionRef = collection(db, "tasks");

  //create a new task with a specific time alotted
  const createTask = async () => {
    await addDoc(taskCollectionRef, {title: newTitle, timeAlotted: timeAlotted});
  };

  //get the all the tasks available when page renders
  useEffect(() => {
    const getTasks = async() => {
      const data = await getDocs(taskCollectionRef);
      setTasks(data.docs.map((doc)=>({...doc.data(), id: doc.id})),[]);
    };
    getTasks();
    
  })
  useEffect(() => {
    const getTasks = async() => {
      const data = await getDocs(taskCollectionRef);
      setTasks(data.docs.map((doc)=>({...doc.data(), id: doc.id})),[]);
    };
    getTasks();
  }, [taskCollectionRef]);

  //delete one task
  const deleteTask = async(id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc)
  }






  return (
    <div className="App">
      <section id= 'new-task-form'>
        <h2>Create Task</h2>
        <input
          placeholder= "New Task"
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value)
          }}
          />
          <input 
          type="number"
          placeholder= "Time Alotted"
          value={timeAlotted}
          onChange={(event) => {
            setTimeAlotted(event.target.value)
          }}
          />
          <button onclick={createTask}>Submit</button>
      </section>
      <section id='render-tasks'>
      <h2 id='task-title'>Tasks</h2>
      {tasks.map((task) => {
        return (
          <section >
            
            {" "}
            <div>
              <p id='task'>{task.title} </p>
              <p id='timeAlotted'>({task.timeAlotted} minutes)</p>
            </div>
            
            
            <button 
              onClick={() => {
                deleteTask(task.id);
              }}
              >
              {" "}
              Delete
            </button>
            </section>
        );
      })}
      </section>

    </div>
  );
}

export default App;
