import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/search/:searchTerm" element = {<HomePage/>}/>
    </Routes>
  )
}


// localhost:3000/search/meat