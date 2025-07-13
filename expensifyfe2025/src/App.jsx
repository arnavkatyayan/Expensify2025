import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './LoginPage'
import { Routes,Route, Link } from 'react-router-dom'
import SignupPage from './SignupPage'
function App() {

 
  

  return (
    <div>
    
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signupPage" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
