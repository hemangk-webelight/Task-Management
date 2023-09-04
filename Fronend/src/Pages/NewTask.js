import React, { useState } from "react";
import '../CSS/newTask.css'
const NewTask = ({setIsOpen}) => {

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWF0IjoxNjkzODI4ODY4LCJleHAiOjE2OTM4MzI0Njh9.4Uk0L8AgIgHG8y823fz63sqQuavDaBfUte7x1lPPTKU"

  const changeHandler = (event) => {
    setTask(state => {
      return { ...state, [event.target.name]: event.target.value }
    })
  }
  const addTaskHandler = async (e) => {
    e.preventDefault();
    console.log(task)
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()
    console.log(data)
  }

  return (
   
    <div className="newTask__container" >

    <div className="newTask__screen">

      <div className="newTask__screen__content">

        <h1>Add New Task</h1>

        <form className="newTask" onSubmit={addTaskHandler}>

          <div className="newTask__field">
            <label htmlFor="title">Title:</label>
            <input type="text" className="newTask__input" value={task.title} onChange={changeHandler} id='title' name='title' />
          </div>

          <div className="login__field">
            <label htmlFor="description">Description:</label>
            <input type="text" className="newTask__input" value={task.description} onChange={changeHandler} id='description' name='description' />
          </div>
          <div className="btn__action">
          <button className="button newTask__submit">
            <span className="button__text">Add Task</span>
          </button>
          <button className="button newTask__submit" onClick={() => setIsOpen(false)}>
            <span className="button__text">cancel</span>
          </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default NewTask;