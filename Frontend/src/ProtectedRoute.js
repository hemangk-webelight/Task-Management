import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ isSignedIn, children }) {
    const token = localStorage.getItem("token")
    return token ? children : <Navigate to="/" replace />
    // if (!token) {
  //   return <Navigate to="/" replace />
  // }

  // if(token) {
  //   return children
  // }

}
export default ProtectedRoute