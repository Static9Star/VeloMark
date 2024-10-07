import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeePunch = () => {
    const toAdmin=useNavigate();
    const back=useNavigate();
    const logout=useNavigate();
  return (
    <>
        <h1>Employee Attendece Page</h1>

        <button onClick={()=>toAdmin('/admin')}>Admin</button>  
        <br /><br />
        <button onClick={()=>logout('/')}>Logout</button>
        <br /><br />
        <button onClick={()=>back(-1)}>Back</button>
    </>
  )
}

export default EmployeePunch;