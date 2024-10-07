import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const back=useNavigate();
    const createEmployee=useNavigate();
    const employeeData=useNavigate();
    const report=useNavigate();
    const logout=useNavigate();
    return (
    <>
        <h1>Dashboard</h1>
        <button onClick={()=>back(-1)}>
            Back
        </button>

        <br /><br />
        <button onClick={()=>logout('/')}>Logout</button>
        <br /><br /><br />

        <button onClick={()=>createEmployee('createEmployee')}>Add New Employee</button>
        <button onClick={()=>employeeData('employeeData')}>Employee List</button>
        <button onClick={()=>report('report')}>Monthly Report</button>

        <hr />

        <Outlet />

    </>
  )
}

export default AdminDashboard