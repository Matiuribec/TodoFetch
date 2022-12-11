import React, { useState, useEffect } from "react";


//include images into your bundle

//create your first component
const Home = () => {
  const [tasks, setTasks] = useState([
  ]);
  const [newTask, setNewTask] = useState("");
  const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/matias"


  function addTask(e) {
    if (e.code == "Enter" && newTask != "") {
      
      setTasks([...tasks, {label: newTask, done: false} ]);
      setNewTask("");
    }
  }

  

  async function removeTask(index) {
	var newTasks = [...tasks]
    newTasks.splice(index, 1)
    if(tasks.lenght>0){
      let respuesta = await fetch(apiUrl,{method: "DELETE"})
      if(respuesta.ok){
        console.log("Eliminada")
      }
    }
	setTasks(newTasks)

  
  }

  function checkTask(index){
    let newTask = [...tasks]
    newTask[index] = {...newTask[index],done: newTask[index].done }
  }
  
  

  useEffect(async() => {
    var response = await fetch(apiUrl)
    if (response.status==404){
      response = await fetch(apiUrl,{
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type" : "application/json"
        }
      })
    }
    else if (!respuesta.ok){
        console.error("Error al cargar la lista: " + respuesta.statusText)
        }
        var data = await respuesta.json()
        setTasks(data)
      },[]) 

  useEffect(async() => {
        if(tasks.lenght>0){
        let resp = await fetch(apiUrl,{
          method: "PUT",
          body: JSON.stringify(tasks),
          headers: {
            "Content-Type" : "application/json"
          }
        })
        if(resp.ok){
          console.info("Lista Actualizada")
        }
    
        }
      },[tasks])

  return (
    <div className="Papel container text-center">
      <h1>To-Do List</h1>
      <div className="Lista d-flex justify-content-center">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <input
              className="form-control"
              type="text"
              onKeyDown={(e) => addTask(e)}
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              name="task"
              id="task"
            ></input>
          </li>

          {tasks.map((task, index) => (
            <li key={index} className="list-group-item">
               <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultChecked={task.done} onChange={(() => checkTask(index))} id="flexCheckDefault" />
                  <label className="form-check-label" for="flexCheckDefault">
                  {task.label}
                  </label>
                </div>
			<button className=" bg-primary rounded-pill ms-5" onClick={()=> removeTask(index)}>X</button>
			</li>
          ))}

          <li className="list-group-item text-muted">
            <small>{tasks.length} items</small>
          </li>
        </ul>
      </div>
    </div>
  );
        
          }

export default Home;

