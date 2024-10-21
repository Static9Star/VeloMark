import React from 'react'
import AdminLogin from './Admin/AdminLogin'
import { Route,Routes } from 'react-router-dom'
import AdminDashboard from './Admin/AdminDashboard'
import EmployeePunch from './EmployeePunch'
import AddEmployee from './Admin/AddEmployee'
import EmloyeeList from './Admin/EmloyeeList'
import WeeklyReport from './Admin/WeeklyReport'

const App = () => {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='admin' element={<AdminDashboard />}>
          <Route index element={<AddEmployee />} />
          <Route path='employeeData' element={<EmloyeeList />} />
          <Route path='report' element={<WeeklyReport />} />
        </Route>
        <Route path='punch' element={<EmployeePunch />} />
      </Routes>
      


    </>
  )
}

export default App