import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmloyeeList = () => {
    const Back =useNavigate();
    return (
    <>
        <h1>List of all Employee from DB and edit or delete option to it.</h1>

        <button onClick={()=>Back(-1)}>Back to DashBoard</button>
    </>
  )
}

export default EmloyeeList