import "../CSS/home.css";
import axios from "axios";
import NewTask from "./NewTask";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'


const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("")

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }


  const fetchTasks = async () => {

    try {

      const response = await axios.get("http://localhost:3000/tasks", header)

      const data = await response;

      setTasks(data.data.data)
    } catch (error) {
      console.log(error.response.data.message)
    }


  }

  useEffect(() => {
    if (search.length > 0) {
      searchHandler()
    }
    fetchTasks()
  }, [isOpen, search])


  const deleteTaskHandler = async (id) => {


    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${id}`, header)
      const data = await response
      toast.success(data.data.message)
      fetchTasks();

    } catch (error) {

      toast.error(error.response.data.message)
    }
  }


  const taskStatusHandler = async (status, id) => {
    const task_status = {
      status
    }

    try {
      const response = await axios.patch(`http://localhost:3000/tasks/${id}/status`, task_status, header)
      const data = await response
      toast.success(data.data.message)
      fetchTasks();

    } catch (error) {

      toast.error(error.response.data.message)
    }
  }

  const filterTaskByStatusHandler = async (status) => {

    if (status !== "ALL") {
      try {
        const response = await axios.get(`http://localhost:3000/tasks?status=${status}`, header)
        const data = await response

        setTasks(data.data.data)
      } catch (error) {

        toast.error(error.response.data.message)
      }
    } else {
      fetchTasks();
    }

  }
  const searchHandler = async () => {

    try {
      const response = await axios.get(`http://localhost:3000/tasks?search=${search}`, header)
      const data = await response
      setTasks(data.data.data)
      setSearchError("")
    } catch (error) {

      console.log(error.response.data.message)
      setSearchError(error.response.data.message)
    }

  }

  return (
    <>
      <div className="task__container">
        <div className="task__header">
          <h2>Task Manager</h2>
          <button onClick={() => { setIsOpen(true) }}>
            <p>Create new task</p>
            <i className="fa fa-plus"></i>
          </button>
          <button id="logout_btn" onClick={() => { localStorage.removeItem("token"); navigate("/login") }}>
            <p>Logout</p>
          </button>
        </div>
        <div className="task__content">
          <div className="task__content-header">

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your task here" />

            <select
              name="Filter_status"
              id="Filter_status"
              onChange={(e) => filterTaskByStatusHandler(e.target.value)}>

              <option value="ALL">ALL</option>
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>

            </select>
          </div>


          <div className="task__content-tasks">
            {
              !tasks.length && <p style={{ textAlign: 'center' }}>No tasks found</p>
            }
            {
              searchError && <p style={{ textAlign: 'center' }}>No tasks found</p>
            }
            {tasks.length > 0 && !searchError && tasks.map(task => (
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

                    <select
                      name="task_status"
                      id="task_status"
                      defaultValue={task.status}
                      onChange={(e) => taskStatusHandler(e.target.value, task.id)}>

                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>

                    </select>
                  </div>

                  <FontAwesomeIcon className="trash_icon" icon={faTrashCan} onClick={() => { deleteTaskHandler(task.id) }} />
                </div>
                <button onClick={() => navigate(`/task/${task.categoryId}`) }>Show task for similar category</button>
              </div>
            ))}

          </div>
        </div>
      </div>

      <div>
        {isOpen && <NewTask isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default Home;