import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../Pages/Authentication/Login'
import Signup from '../Pages/Authentication/Signup';
import Home from '../Pages/TaskManager/Home';
import Category from '../Pages/TaskManager/Category'
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from '../Pages/Update Passoword/ForgotPassword';
import ChangePassword from '../Pages/Update Passoword/ChangePassword';


const Router = () => {

    const routerData = [
        
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/login',
            element: <Navigate to={'/'} />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/task',
            element: <ProtectedRoute>
                            <Home />
                    </ProtectedRoute>
        },
        {
            path: '/task/:id',
            element: <ProtectedRoute>
                            <Category />
                    </ProtectedRoute>
        },
        {
            path: '/login/forgot-password',
            element: <ForgotPassword />
        },
        {
            path: '/login/change-password',
            element: <ChangePassword />
        },
    ]

  return (
    <Routes>

        {routerData.map((data, id) => {
            return <Route key={id} path={data.path} element={data.element} />
        })}
      </Routes>
  )
}

export default Router
