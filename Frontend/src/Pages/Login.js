import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import '../CSS/login.css'
import axios from 'axios'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    nameError: '',
    passwordError: ''
  })

  const navigate = useNavigate()

  const changeHandler = (event) => {

    setFormData(state => {
      return { ...state, [event.target.name]: event.target.value }
    })

    setErrors({
      nameError: '',
      passwordError: ''
    })
  }

  const loginHandler = async (e) => {

    try {

      e.preventDefault();

      const response = await axios.post("http://localhost:3000/auth/signin", formData)

      if (response.status === 200) {

        const data = await response
        localStorage.setItem("token", data.data.token)
        toast.success(data.data.message)
        navigate('/task')
      }

    } catch (error) {

      const errorMsg = error.response.data.message
      if (Array.isArray(errorMsg)) {
        const nameError = error.response.data.message.filter(name => name.includes("email"))
        const passwordError = error.response.data.message.filter(name => name.includes("password"))
        setErrors(state =>
        ({
          ...state, nameError, passwordError
        }))

      }
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="container">

      <div className="screen">

        <div className="screen__content">

          <h1>Login</h1>

          <form className="login" onSubmit={loginHandler}>

            <div className="login__field">
              <label htmlFor="username">email:</label>
              <i className="login__icon fa fa-user"></i>
              <input
                type="email"
                className="login__input"
                value={formData.email}
                onChange={changeHandler}
                id='email'
                name='email' />
              <span style={{ color: 'red', fontSize: '14px' }} >{errors.nameError}</span>
            </div>

            <div className="login__field">
              <label htmlFor="password">Password:</label>
              <i className="login__icon fa fa-lock"></i>
              <input
                type="password"
                className="login__input"
                value={formData.password}
                onChange={changeHandler}
                id='password'
                name='password' />
              <span style={{ color: 'red', fontSize: '14px' }} >{errors.passwordError}</span>
            </div>
            
            <div className='password__links'>
              <NavLink to='/login/forgot-password'> Forgot Password ?</NavLink>
              <NavLink to='/login/change-password'> Change Password ?</NavLink>
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