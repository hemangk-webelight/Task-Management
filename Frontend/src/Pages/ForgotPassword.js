import React, { useState } from 'react'
import '../CSS/login.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')

  const navigate = useNavigate();

  const submitHandler = async (e) => {

    e.preventDefault();
    const response = await axios.post('http://localhost:3000/auth/forgotPassword', { email })

    const data = await response;
    toast.success(data.data.message)
    navigate("/login")
  }

  return (
    <div className="container">

      <div className="screen">

        <div className="screen__content">

          <h1>Forgot Password</h1>

          <form className="login" onSubmit={submitHandler}>

            <div className="login__field">
              <label htmlFor="username">email:</label>
              <i className="login__icon fa fa-user"></i>
              <input
                type="email"
                className="login__input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id='email'
                name='email' />
              {/* <span style={{ color: 'red', fontSize: '14px' }} >{errors.nameError}</span> */}
            </div>

            <button className="button login__submit">
              <span className="button__text">Send Email</span>
              <i className="button__icon fa fa-chevron-right"></i>
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
