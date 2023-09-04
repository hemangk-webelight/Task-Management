import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/login.css'
const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const changeHandler = (event) => {
    setFormData(state => {
      return { ...state, [event.target.name]: event.target.value }
    })
  }

  const loginHandler = async(e) => {
    
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/signin", {
      method: 'POST',
      body: JSON.stringify(formData)
    })

    const data = await response.json()
  }

  return (
    <div className="container">

      <div className="screen">

        <div className="screen__content">

          <h1>Login</h1>

          <form className="login" onSubmit={loginHandler}>

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
              <span className="button__text">Login Now</span>
              <i className="button__icon fa fa-chevron-right"></i>
            </button>

            <p>Not Signup? <Link to={'/signup'}>SignUp Here</Link> </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login