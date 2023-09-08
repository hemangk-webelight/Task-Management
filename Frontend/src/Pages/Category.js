import axios from 'axios'
import '../CSS/category.css'
import Header from '../Component/Header'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { faUpDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Category = () => {

  const [tasks, setTasks] = useState([])
  const [ascending, setAscending] = useState(true)

  const { id } = useParams()
  const navigate = useNavigate()

  const getAllDataForSimilarCategory = async () => {

    const response = await axios.get(`http://localhost:3000/category/${id}`);

    const data = await response
    setTasks(data.data.data)
  }

  const sortedArr = (task) => {

    return task.slice().sort((a, b) => {
      if (ascending) {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })
  }

  useEffect(() => {
    getAllDataForSimilarCategory()
  }, [])

  return (
    <div className='table_container'>
      <Header />
      <div className='table_content-header'>
        <button onClick={() => navigate(-1)}>back</button>
        <h3>Users and tasks with similar category</h3>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>User</th>
            <th>Category</th>
            <th>Created at &nbsp; <FontAwesomeIcon icon={faUpDown} onClick={() => setAscending(!ascending)} /></th>
          </tr>
        </thead>

        <tbody>
          {
            tasks.length > 0 && sortedArr(tasks).map(task => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.user.username}</td>
                <td>{task.category.category}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}

export default Category
