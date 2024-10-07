import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const toPunch=useNavigate();
  return (
    <>
        <h1>Admin Loin Authentication</h1>

        <button onClick={()=>toPunch('/punch')}>Authenticate</button>
    </>
  )
}

export default AdminLogin