import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
// import './App.css'
import { Container } from 'react-bootstrap'
import { SignUp } from './pages/SignUp'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { AuthProvider } from './context/AuthContext'
import { Splits } from './pages/Splits'
import { PrivateRoute } from './routes/PrivateRoute'
import { ForgotPassword } from './pages/ForgotPassword'


function App() {

  return (
    <AuthProvider>
<div className='background d-flex align-items-center justify-content-center'>
      <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/reset-password" element={<ForgotPassword/>} />

      <Route path="/splits" element={
        <PrivateRoute>
          <Splits/>
        </PrivateRoute>  } 
      />

      </Routes>
    </div>

    </AuthProvider>
    
  )
}

export default App
