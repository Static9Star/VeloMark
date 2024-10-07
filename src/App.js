import React from 'react'
import AdminLogin from './Admin/AdminLogin'
import { Route,Routes } from 'react-router-dom'
import AdminDashboard from './Admin/AdminDashboard'
import EmployeePunch from './EmployeePunch'
import AddEmployee from './Admin/AddEmployee'
import EmloyeeList from './Admin/EmloyeeList'
import MonthlyReport from './Admin/MonthlyReport'

const App = () => {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='admin' element={<AdminDashboard />}>
          <Route path='createEmployee' element={<AddEmployee />} />
          <Route path='employeeData' element={<EmloyeeList />} />
          <Route path='report' element={<MonthlyReport />} />
        </Route>
        <Route path='punch' element={<EmployeePunch />} />
      </Routes>

    </>
  )
}

export default App