import React from 'react';
import { useNavigate } from 'react-router-dom';

const MonthlyReport = () => {   
    const Back =useNavigate();
    return (
    <>
        <h1>Displaying Monthly Report of employees Punching Data from DB</h1>

        <button onClick={()=>Back(-1)}>Back to DashBoard</button>
    </>
  )
}

export default MonthlyReport