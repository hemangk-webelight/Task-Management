import React from 'react'
import '../CSS/home.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()
  return (
    <div className="task__header">
          <h2>Task Manager</h2>
         
          <button id="logout_btn" onClick={() => { localStorage.removeItem("token"); navigate("/login") }}>
            <p>Logout</p>
          </button>
        </div>
  )
}

export default Header
