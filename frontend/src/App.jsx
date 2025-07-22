import React ,  { useState } from 'react'
import './App.css'
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import UserProfile from './pages/UserProfile.jsx';
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
    </>
  )
}

export default App
