import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Employess } from './components/Employees'

function App() {
  

  return (
    <div>
      <h1 style={{color:"teal"}}>Employee Management System</h1>
      <Employess />
    </div>
  )
}

export default App
