import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SimilarCatgoryTasks = () => {

  const [tasks, setTasks] = useState()
  const {id} = useParams()
  const getAllDataForSimilarCategory = async() => {
    
    const response = await axios.get(`http://localhost:3000/category/${id}`);
    
    const data = await response
    console.log(data.data.users)

  }

  useEffect(() => {
    getAllDataForSimilarCategory()
  }, [])
  return (
    <div>Hello</div>
  )
}

export default SimilarCatgoryTasks
