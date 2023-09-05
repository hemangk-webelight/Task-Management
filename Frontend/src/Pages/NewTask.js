import axios from 'axios'
import '../CSS/newTask.css'
import React, { useState } from "react";
import { toast } from "react-toastify";

const NewTask = ({ setIsOpen }) => {

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const [errors, setErrors] = useState({
    titleError: '',
    descriptionError: ''
  })

  const token = localStorage.getItem("token")

  const changeHandler = (event) => {
    setTask(state => {
      return { ...state, [event.target.name]: event.target.value }
    })

    setErrors({
      titleError: '',
      descriptionError: ''
    })
  }
  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const addTaskHandler = async (e) => {

    try {

      e.preventDefault();
      const response = await axios.post('http://localhost:3000/tasks', task, header)

      const data = await response;
      toast.success(data.data.message)
      setIsOpen(false)

    } catch (error) {

      const titleError = error.response.data.message.filter(name => name.includes("title"))
      const descriptionError = error.response.data.message.filter(name => name.includes("description"))

      setErrors(state =>
      ({
        ...state, titleError, descriptionError
      }))
    }

  }

  return (
    <>
      <div className="modal"></div>

      <div className="newTask__container" >

        <div className="newTask__screen">

          <div className="newTask__screen__content">

            <h1>Add New Task</h1>

            <form className="newTask" onSubmit={addTaskHandler}>

              <div className="newTask__field">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="newTask__input"
                  value={task.title}
                  onChange={changeHandler}
                  id='title'
                  name='title' />
                <span style={{ color: 'red', fontSize: '14px' }} >{errors.titleError}</span>
              </div>

              <div className="login__field">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="newTask__input"
                  value={task.description}
                  onChange={changeHandler}
                  id='description'
                  name='description' />
                <span style={{ color: 'red', fontSize: '14px' }} >{errors.descriptionError}</span>
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
    </>
  );
};

export default NewTask;