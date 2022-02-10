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
  const createTask = async (submitEvent) => {
    submitEvent.preventDefault();
    console.log("it got here")
    await addDoc(taskCollectionRef, {
      title: newTitle, 
      timeAlotted: timeAlotted,
      completed: false
    });
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

  // delete all tasks
  
    
    const deleteAllTasks = query(collection(db, `tasks`), where(`completed`, `==`, true))
    const querySnapshot = await getDocs(deleteAllTasks)
    try{
    await Promise.all(querySnapshot.forEach((aDoc) => {
    deleteDoc(doc(db, `tasks`, aDoc.id))
    }))
    }catch(err){
    console.log(err.message)
    }
  

  





  return (
    <div className="App">
      <section id= 'new-task-form'>
          <h2>Create Task</h2>
        <form autoComplete="off" onSubmit={createTask} className="createTask">
            <input
              placeholder= "Task"
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
              <input
        type="submit"
        value="Submit"
        disabled={
          newTitle === 0 ||
          timeAlotted === 0 
          
        }
        className="submit-button"
      ></input>
       </form>
      </section>
      <section id='render-tasks'>
      <h2 id='task-title'>Tasks <button onclick={deleteAllTasks}>Delete All</button> </h2>
      
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
