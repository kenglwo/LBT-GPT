import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import VisTestIndex from './components/vis_test/VisTestIndex'
import LoginPage from './components/vis_test/LoginPage'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/test' element={<VisTestIndex />} />
    </Routes>
  )
}

export default App
