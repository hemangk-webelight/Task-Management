import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Home from './Pages/Home';

function App() {
  return (
      <Routes>
         <Route path='/' element={<Login />}/>
         <Route path='/login' element={<Navigate to={'/'} />}/> 
         <Route path='/signup' element={<Signup />}/>
         <Route path='/task' element={<Home />}/>
      </Routes>
    );
}

export default App;