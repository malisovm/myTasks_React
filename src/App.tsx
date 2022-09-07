import React, { useEffect, useState } from 'react'
import './App.css'
import { Topbar } from './components/Topbar/Topbar'
import { TaskGrid } from './components/TaskGrid/TaskGrid'
import { Help } from './components/Help/Help'
import { Loading } from './components/Loading/Loading'
import { BgColor } from './components/BgColor/BgColor'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { Error } from './components/Error/Error'
import { ITask, ITaskType } from './interfaces'

function App() {
  const [bodyBgColor, setBodyBgColor] = useState('')
  const [darkenLayer, setDarkenLayer] = useState('none')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [savedData, setSavedData] = useState<ITaskType[]>()
  document.querySelector('body')!.style.backgroundColor = bodyBgColor

  useEffect(() => {
    const getData = async () => {
      try {
        let savedTasks = await axios.get<ITask[]>('/tasks')
        let savedTaskTypes = await axios.get<ITaskType[]>('/tasktypes')
        let globals = await axios.get('/globals', {
          headers: {
            id: 'bodyColor',
          },
        })
        const savedData = savedTaskTypes.data.map(
          (taskType: ITaskType, index) => {
            let thisColumnTasks: ITask[] = []
            savedTasks.data.forEach((task) => {
              if (task.column === taskType.column) {
                thisColumnTasks.splice(task.row-1, 0, task)
              }
            })
            taskType.tasks = thisColumnTasks
            return taskType
          }
        )
        setSavedData(savedData)
        console.log('Server: found data', savedData)
        setBodyBgColor(globals.data.value)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        console.log(error)
        setError(`Load '${error.config.url}': ${error.message}`)
      }
    }
    getData()
  }, [])

  if (loading) return <Loading />
  if (!error)
    return (
      <BrowserRouter>
        <div id="darkenLayer" style={{ display: darkenLayer }}></div>

        <Topbar />
        <Routes>
          <Route
            path="/"
            element={
              <TaskGrid
                bodyBgColor={bodyBgColor}
                setDarkenLayer={setDarkenLayer}
                savedData={savedData!}
              />
            }
          />
          <Route path="/help" element={<Help />} />
          <Route
            path="/bgColor"
            element={
              <BgColor
                bodyBgColor={bodyBgColor}
                setBodyBgColor={setBodyBgColor}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )
  else {
    return <Error error={error} />
  }
}

export default App
