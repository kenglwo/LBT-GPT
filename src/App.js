import { React, useState, useRef, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import VisTestIndex from './components/vis_test/VisTestIndex'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<VisTestIndex />} />
    </Routes>
  )
}

export default App
