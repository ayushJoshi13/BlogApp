import React from 'react'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={ <Home />} />
     <Route path='/register' element={ <Signup />} />
     <Route path='/login' element={ <Login/>} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  )
}

export default App
