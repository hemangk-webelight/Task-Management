import { Routes, Route, Navigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';

function App() {
  const token = localStorage.getItem("token")
  
  return (
    <>
    <ToastContainer />
      <Routes>
         <Route path='/' element={<Login />}/>
         <Route path='/login' element={<Navigate to={'/'} />}/> 
         <Route path='/signup' element={<Signup />}/>
         <Route path='/task' element={ !token ? <Navigate to={'/'} /> :  <Home /> }/>
      </Routes>
      </>
    );
}

export default App;