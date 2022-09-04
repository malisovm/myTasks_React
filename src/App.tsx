import React, { useState } from 'react'
import './App.css'
import { Topbar } from './components/Topbar/Topbar'
import { TaskGrid } from './components/TaskGrid/TaskGrid'
import { Help } from './components/Help/Help'
//import { Error } from './components/Error/Error'
//import { Loading } from './components/Loading/Loading'
import { BgColor } from './components/BgColor/BgColor'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  const [bodyBgColor, setBodyBgColor] = useState('#861f93')
  const body = document.querySelector('body')
  body!.style.backgroundColor = bodyBgColor

  const [darkenLayer, setDarkenLayer] = useState('none')

  return (
    <BrowserRouter>
      <div id="darkenLayer" style={{ display: darkenLayer }}></div>

      <Topbar/>
      <Routes>
        <Route
          path="/"
          element={
            <TaskGrid
              bodyBgColor={bodyBgColor}
              setDarkenLayer={setDarkenLayer}
            />
          }
        />
        <Route path="/help" element={<Help />} />
        <Route path="/bgColor" element={<BgColor bodyBgColor={bodyBgColor} setBodyBgColor={setBodyBgColor} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
