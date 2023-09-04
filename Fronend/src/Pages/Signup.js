import React, { useState } from 'react'
import '../CSS/login.css'

import { Link } from 'react-router-dom'

const Signup = () => {
  
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      })
    
      const changeHandler = (event) => {
        setFormData(state => {
          return { ...state, [event.target.name]: event.target.value }
        })
      }
    


  const signUpHandler = async(e) => {
    
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: 'POST',
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    console.log(data)
  }

      return (
        <div className="container">
    
          <div className="screen">
    
            <div className="screen__content">
    
              <h1>Sign up</h1>
    
              <form className="login" onSubmit={signUpHandler}>
    
                <div className="login__field">
                  <label htmlFor="username">Username:</label>
                  <i className="login__icon fa fa-user"></i>
                  <input type="text" className="login__input" value={formData.username} onChange={changeHandler} id='username' name='username' />
                </div>
    
                <div className="login__field">
                  <label htmlFor="password">Password:</label>
                  <i className="login__icon fa fa-lock"></i>
                  <input type="password" className="login__input" value={formData.password} onChange={changeHandler} id='password' name='password' />
                </div>
    
                <button className="button login__submit">
                  <span className="button__text">Signup Now</span>
                  <i className="button__icon fa fa-chevron-right"></i>
                </button>
    
                <p>Already Signup ? <Link to={'/login'}>Login Here</Link> </p>
              </form>
            </div>
          </div>
        </div>
      )
}

export default Signup