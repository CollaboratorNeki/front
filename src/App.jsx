import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import About from './pages/about/About'
import Settings from './pages/settings/Settings'
import Home from './pages/home/home'
import NewProject from './pages/newProject/NewProject'
import NewTask from './pages/newTask/NewTask'
import Reports from './pages/reports/Reports'
import Registrations from './pages/registration/Registrations'
import Accessibility from './components/accessibility/accessibility'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/newProject' exact element={<NewProject />}></Route>
          <Route path='/newTask' exact element={<NewTask />}></Route>
          <Route path='/reports' exact element={<Reports />}></Route>
          <Route path='/registrations' exact element={<Registrations />}></Route>
          <Route path='/about' exact element={<About />}></Route>
          <Route path='/settings' exact element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
