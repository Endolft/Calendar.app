import React from 'react'
import { Routes,Route,Navigate} from 'react-router-dom'
import { CalendarPage } from '../pages/CalendarPage'

export const CalendarRoute = () => {
  return (
    <Routes>
        <Route path={'/'} element={<CalendarPage/>}/>
        <Route path={'/*'} element={<Navigate to='/'/>}/>
    </Routes>
  )
}
