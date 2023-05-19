import React from 'react'
import MainTemplate from './templates/MainTemplate'
import Login from './pages/LoginFormik'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<MainTemplate />} />
      </Routes>
    </Router>
  )
  
}

export default App
