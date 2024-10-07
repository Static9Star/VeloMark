import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const Back =useNavigate();
    return (
    <>
        <h1>Form to add New Employee in DB</h1>

        <button onClick={()=>Back(-1)}>Back to DashBoard</button>
    </>
  )
}

export default AddEmployee