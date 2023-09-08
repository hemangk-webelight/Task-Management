import "../CSS/home.css";
import axios from "axios";
import NewTask from "./NewTask";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import Header from "../Component/Header";


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
      console.log(data)
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
      setSearchError(error.response.data.message)
    }

  }

  const categoryHandler = async (category) => {

    try {
      const response = await axios.get(`http://localhost:3000/tasks?category=${category}`, header)
      const data = await response
      setTasks(data.data.data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className="task__container">
        <Header />
        <div className="task__content">
          <div className="task__content-header">

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your task here" />

            <button onClick={() => { setIsOpen(true) }}>
              <p>Create new task</p>
              <i className="fa fa-plus"></i>
            </button>

            <select
              name="Filter_status"
              id="Filter_status"
              onChange={(e) => filterTaskByStatusHandler(e.target.value)}>

              <option value="ALL">ALL</option>
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>

            </select>

            <select
              name="Filter_category"
              id="Filter_category"
              onChange={(e) => categoryHandler(e.target.value)}>

              <option value="REACTJS">REACTJS</option>
              <option value="NODEJS">NODEJS</option>
              <option value="EXPRESSJS">EXPRESSJS</option>
              <option value="NESTJS">NESTJS</option>
              <option value="NEXTJS">NEXTJS</option>

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
              <div className="task__content-task" key={task._id}>
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
                      onChange={(e) => taskStatusHandler(e.target.value, task._id)}>

                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>

                    </select>
                  </div>

                  <FontAwesomeIcon className="trash_icon" icon={faTrashCan} onClick={() => { deleteTaskHandler(task._id) }} />
                </div>
                <button onClick={() => navigate(`/task/${task.category}`)}>Show more tasks</button>
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