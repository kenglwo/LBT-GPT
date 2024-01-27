import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import VisTestIndex from './components/vis_test/VisTestIndex'
import LoginPage from './components/vis_test/LoginPage'
import EndPage from './components/vis_test/EndPage'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/test' element={<VisTestIndex />} />
      <Route path='/end' element={<EndPage />} />
    </Routes>
  )
}

export default App
