import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './LoginPage'
import { Routes,Route, Link, Navigate } from 'react-router-dom'
import SignupPage from './SignupPage'
import Logo from '/projectLogo.png';
function App() {
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  
  

  return (
    <div>
      <div className="flex">
        <img src={Logo} className="h-14 title logo" />
        <h1 className="title">Expensify</h1>
      </div>
      
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              isSignupClicked={isSignupClicked}
              setIsSignupClicked={setIsSignupClicked}
            />

          }
        />
        <Route path="/signup" element={<SignupPage isSignupClicked={isSignupClicked} setIsSignupClicked={setIsSignupClicked} />} />
      </Routes>
    </div>
  );
}

export default App;
