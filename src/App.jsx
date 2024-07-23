import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import AuthService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  //loading state to fecilitate conditional rendering while making db/api calls
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch(false)

  useEffect(() => {
    AuthService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          OUTLET
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
