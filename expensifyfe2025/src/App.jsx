import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './LoginPage'
import { Routes,Route, Link, Navigate } from 'react-router-dom'
import SignupPage from './SignupPage'
import Logo from '/projectLogo.png';
import Dashboard from './Dashboard'
import DashboardChildComp from './DashboardChildComp'
function App() {
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [email, setEmail] = useState(() => {
  return sessionStorage.getItem("email") || "";
});
  const [isSignedIn, setIsSignedIn] = useState(() => {
  return sessionStorage.getItem("signedIn") === "true";
});
  const [user, setUser] = useState(()=> {
    return sessionStorage.getItem("user") || "";
  })
  return (
    <div>
      <div className="flex">
        <img src={Logo} className="h-14 title logo" />
        <h1 className="title">Expensify</h1>
      </div>
      {isSignedIn ?
        <Dashboard user={user}/> : null}
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              isSignupClicked={isSignupClicked}
              setIsSignupClicked={setIsSignupClicked}
              setEmail={setEmail}
              setIsSignedIn={setIsSignedIn}
              setUser={setUser}
            />

          }
        />
        {}
        <Route path="/signup" element={<SignupPage isSignupClicked={isSignupClicked} setIsSignupClicked={setIsSignupClicked} />} />
        {isSignedIn ? 
        <>
        <Route path="/dashboard" element={<Dashboard email={email} user={user}/>} />
        <Route path="/dashboard/dashboardChildComp" element={<DashboardChildComp/>} /> 
        </>
        :null }
      </Routes>
    </div>
  );
}

export default App;
