import '../CSS/login.css'
import axios from 'axios'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const [formData, setFormData] = useState({
    username: '',
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

  const signUpHandler = async (e) => {

    try {
      e.preventDefault();

      const response = await axios.post("http://localhost:3000/auth/signup", formData)

      if (response.status === 201) {
        const data = await response
        console.log(data)
        toast.success(data.data.message)
        navigate('/login')
      }

    } catch (error) {

      const nameError = error.response.data.message.filter(name => name.includes("username"))
      const passwordError = error.response.data.message.filter(name => name.includes("password"))

      setErrors(state =>
      ({
        ...state, nameError, passwordError
      }))

    }

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
              <input
                type="text"
                className="login__input"
                value={formData.username}
                onChange={changeHandler}
                id='username'
                name='username' />
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

              <span style={{ color: 'red', fontSize: '14px' }}>
                {errors.passwordError}
              </span>
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