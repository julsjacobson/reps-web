import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
// import './App.css'
import { Container } from 'react-bootstrap'
import { SignUp } from './pages/SignUp'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/SignIn'


function App() {

  return (
    <div className='background d-flex align-items-center justify-content-center'>
      <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn/>} />

      </Routes>
    </div>

  )
}

export default App
