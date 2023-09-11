import "../../CSS/home.css";
import axios from "axios";
import NewTask from "./NewTask";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import Header from "../../shared/Component/Header";
import { BASE_CATEGORY_URL, BASE_TASK_URL, HEADER } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getTasksData } from "../../features/taskSlice";


const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [categories, setCategories] = useState([])

  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("")

  const navigate = useNavigate()


  const fetchTasks = async () => {

    try {

      const response = await axios.get(`${BASE_TASK_URL}`, HEADER)

      const data = await response;

      setTasks(data.data.data)
    } catch (error) {

      console.log(error.response.data.message)
    }


  }

  const getCategories = async () => {
    const response = await axios.get(`${BASE_CATEGORY_URL}`)

    const categoryOptions = await response

    setCategories(categoryOptions.data.data)
  }

  useEffect(() => {
    if (search.length > 0) {
      searchHandler()
    }
    fetchTasks()
    getCategories()
  }, [isOpen, search])


  const deleteTaskHandler = async (id) => {


    try {
      const response = await axios.delete(`${BASE_TASK_URL}/${id}`, HEADER)
      const data = await response
      fetchTasks();
      toast.success(data.data.message)
    } catch (error) {

      toast.error(error.response.data.message)
    }
  }


  const taskStatusHandler = async (status, id) => {
    const task_status = {
      status
    }

    try {
      const response = await axios.patch(`${BASE_TASK_URL}/${id}/status`, task_status, HEADER)
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
        const response = await axios.get(`${BASE_TASK_URL}?status=${status}`, HEADER)
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
      const response = await axios.get(`${BASE_TASK_URL}?search=${search}`, HEADER)
      const data = await response
      setTasks(data.data.data)
      setSearchError("")
    } catch (error) {
      setSearchError(error.response.data.message)
    }

  }

  const categoryHandler = async (category) => {

    if (category !== "ALL"){

    
    try {
      const response = await axios.get(`${BASE_TASK_URL}?category=${category}`, HEADER)
      const data = await response
      setTasks(data.data.data)
      console.log(data.data.data)
    } catch (error) {
      console.log(error)
    }}else{
      fetchTasks()
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

          </div>

          <div className="task__content-header">
          <div className="filter-header">
          <label htmlFor="Filter_status">Status:</label>
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

            <div className="filter-header">

            <label htmlFor="category">Category:</label>
            <select id='category' name='categoryType' onChange={(e) => categoryHandler(e.target.value)}>
                  <option value="ALL">ALL</option>
                  {
                    categories.length && categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))
                  }
                </select>

                </div>
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
                <button onClick={() => navigate(`/task/${task.categoryUUID}`)}>Show more tasks</button>
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