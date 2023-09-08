import { Routes, Route, Navigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Category from './Pages/Category'
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './Pages/ForgotPassword';
import ChangePassword from './Pages/ChangePassword';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Navigate to={'/'} />} />
        <Route path='/signup' element={<Signup />} />
        <Route 
            path='/login/forgot-password' 
            element = {<ForgotPassword/>} />
        <Route 
            path='/login/change-password' 
            element = {<ChangePassword/>} />
        <Route 
            path='/task' 
            element = {
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                  } />
        
        <Route path='/task/:id'  element = {
                    <ProtectedRoute>
                        <Category />
                    </ProtectedRoute>
                  }  />
      </Routes>
    </>
  );
}

export default App;