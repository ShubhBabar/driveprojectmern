import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import LandingPage from './components/LandingPage'

function App() {
  const isAuthenticated = localStorage.getItem('authToken');
  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* <Route path='/' element={<LandingPage/>}/> */}

        {/* Protected Route: If authenticated, prevent access to LandingPage */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} 
        />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
