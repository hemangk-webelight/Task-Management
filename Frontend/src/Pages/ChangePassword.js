import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {

  const [formdata, setFormData] = useState({
    email: '',
    password: '',
    newPassword: ''
  })

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setFormData(state => (
      { ...state, [e.target.name]: e.target.value }
    ))
  }

  const submitHandler = async (e) => {
    const response = await axios.post("http://localhost:3000/auth/changePassword", formdata)
    console.log(response)
    const data = await response;
    navigate('/login')
    console.log(data)
  }


  return (
    <div className="container">

      <div className="screen">

        <div className="screen__content">

          <h1>Change Password</h1>

          <form className="login" onSubmit={submitHandler}>

            <div className="login__field">

              <label htmlFor="username">Email:</label>
              <i className="login__icon fa fa-user"></i>
              <input
                type="email"
                className="login__input"
                value={formdata.email}
                onChange={changeHandler}
                id='email'
                name='email' />

            </div>

            <div className="login__field">

              <label htmlFor="username">Current temporary password:</label>
              <i className="login__icon fa fa-user"></i>
              <input
                type="password"
                className="login__input"
                value={formdata.currentPassword}
                onChange={changeHandler}
                id='password'
                name='password' />

            </div>

            <div className="login__field">

              <label htmlFor="username">New password:</label>
              <i className="login__icon fa fa-user"></i>
              <input
                type="password"
                className="login__input"
                value={formdata.newPassword}
                onChange={changeHandler}
                id='newPassword'
                name='newPassword' />

            </div>


            <button className="button login__submit">
              <span className="button__text">Change password</span>
              <i className="button__icon fa fa-chevron-right"></i>
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
