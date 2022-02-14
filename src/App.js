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
  const [toggle, setToggle] = React.useState(true);
  const [completed,setCompleted] = useState('')
  const [checked, setChecked] = useState(completed);
  

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
  // useEffect(() => {
  //   const getTasks = async() => {
  //     const data = await getDocs(taskCollectionRef);
  //     setTasks(data.docs.map((doc)=>({...doc.data(), id: doc.id})),[]);
  //   };
  //   getTasks();
    
  // })
  const getTasks = async() => {
    const data = await getDocs(taskCollectionRef);
    setTasks(data.docs.map((doc)=>({...doc.data(), id: doc.id})),[]);
  };
  useEffect(() => {
    getTasks();
  }, []);

  //delete one task
  const deleteTask = async(id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc)
  }

  // delete all tasks
  
    
    // const deleteAllTasks = query(collection(db, ‘tasks’), where(‘completed’, “==”, true))
    // const querySnapshot = await getDocs(deleteAllTasks)
    // try{
    // await Promise.all(querySnapshot.forEach((aDoc) => {
    // deleteDoc(doc(db, ‘tasks’, aDoc.id))
    // }))
    // }catch(err){
    // console.log(err.message)
    // }
  

  const timeAlottedLength = () => {
    if (timeAlotted === 0 ) {
      return "invalid-input";
    } else {
      return "";
    }
  };

  const titleLength = () => {
    if (newTitle === 0 ) {
      return "invalid-input";
    } else {
      return "";
    }
  };

//update time alotted and task
  
  const markAsCompleted= async(id) =>{
    const taskDocRef = doc(db,'tasks',id)
    await updateDoc(taskDocRef, {
      completed: checked
    })
    

    


  }
  const handleTitleUpdate = async(e, id)=>{
    e.preventDefault()
    const taskDocRef = doc(db,'tasks',id)
    
    await updateDoc(taskDocRef, {
      newTitle: newTitle,
      timeAlotted: timeAlotted
    }
    )}
  function toggleInput() {
    setToggle(false);
  }
  const handleKeyPress = e => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    this.btn.click();
  }
};




  return (
    <div className="App">
      <section id= 'new-task-form'>
          <h2>Create Task</h2>
        <form autoComplete="off" onSubmit={createTask} className="createTask">
            <input
              placeholder= "Task"
              value={newTitle}
              className={titleLength()}
              onChange={(event) => {
                setNewTitle(event.target.value)
              }}
              />
              <input 
              type="number"
              placeholder= "Time Alotted"
              value={timeAlotted}
              className={timeAlottedLength()}
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
      <h2 id='task-title'>Tasks  </h2>
      {tasks.map((task) => {
        return (
          <section >
            
            {" "}
            <div>
            {toggle ? (
                <p id='task' onDoubleClick={toggleInput}>{task.title} </p>
              ) : (
                <input type="text" value={task.newTitle} onChange={handleTitleUpdate} onKeyDown={handleKeyPress}/>
              //i need to finish the  double click to edit functionality
                )
              }
              
              
              <p id='timeAlotted' onDoubleClick={handleTitleUpdate}>({task.timeAlotted} minutes)</p>
            </div>
            <input className='checkbox'
              type="checkbox"
              checked={checked} 
              onChange={markAsCompleted}
              id={`checkbox-${task.id}`} />
              <label 
            htmlFor={`checkbox-${task.id}`} 
            className="checkbox-custom-label" 
            onClick={() => setChecked(!checked)} ></label>
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
