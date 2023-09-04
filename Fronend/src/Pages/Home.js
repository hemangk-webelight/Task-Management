import React, { useEffect, useState } from "react";
import "../CSS/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import NewTask from "./NewTask";


const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState([]);


  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWF0IjoxNjkzODI4ODY4LCJleHAiOjE2OTM4MzI0Njh9.4Uk0L8AgIgHG8y823fz63sqQuavDaBfUte7x1lPPTKU"

  const fetchTasks = async () => {

    const response = await fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json();
    console.log(data.data)
    setTasks(data.data)

  }

  useEffect(() => {

    fetchTasks()

  }, [])

  const deleteTask = async (id) => {
  
    console.log(id)
  
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json();
    console.log(data)
    fetchTasks();
  }

  const taskStatusHandler = async (status, id) => {
    const task_status = {
      status
    }

    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task_status)
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="task__container">
        <div className="task__header">
          <p>Task Manager</p>
          <button onClick={() => { setIsOpen(true) }}>
            <p>Create new task</p>
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="task__content">
          <div className="task__content-header">
            <input type="search" placeholder="Search your task here" />

            <select name="" id="">
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
          <div className="task__content-tasks">
            {
              !tasks.length && <p>No tasks found</p>
            }
            {tasks.length && tasks.map(task => (
              <div className="task__content-task" key={task.id}>
                <div>
                  <h4>{task.title}</h4>
                  <p>
                    {task.description}
                  </p>
                </div>
                <div className="task__action">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: "5px" }}>
                    <p>Status: {task.status.toLowerCase()}</p>

                    <select name="task_status" id="task_status" onChange={(e) => taskStatusHandler(e.target.value, task.id)}>

                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </div>
                  <FontAwesomeIcon className="trash_icon" icon={faTrashCan} onClick={() => { deleteTask(task.id) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {isOpen && <NewTask isOpen = {isOpen} setIsOpen = {setIsOpen} />}
      </div>
    </>
  );
};

export default Home;