import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../FirebaseServices'; // Import the loginUser function

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const user = await loginUser(email, password); // Call the loginUser function
      setStatus(`Welcome <u><i>${user.email}</i></u>`); // Display welcome message
      setError(''); // Clear any previous error
      navigate('/punch'); // Navigate to the punch page upon successful login
    } catch (error) {
      setError(error.message); // Capture and display any error messages
      setStatus(''); // Clear status on error
    }
  };

  return (
    <>
      <p className='display-6 text-center text-light pt-1'><u>VeloMark : Velocity Marksheet</u></p>
      
      <p id="status" className="text-info" dangerouslySetInnerHTML={{ __html: status }}></p>
      <small><span id="error" className="text-danger position-absolute fs-6 fw-bolder" style={{left:'50%',transform:'translateX(-50%)',top:'15%'}}>{error}</span></small>
      
      <form className="form" onSubmit={handleLogin}>
        <p className="title">Login </p>  
              
          <label>
              <input type="email" className="input" value={email} id="user"
              onChange={(e) => setEmail(e.target.value)} required />
              <span>Email</span>
          </label>

          <label>
              <input type="password" className="input" value={password} id="password"
              onChange={(e) => setPassword(e.target.value)} required />
              <span>Password</span>
          </label>

          <button className="submit" value="Login" id="login" type="submit">Submit</button>
      </form>

    </>
  );
};

export default AdminLogin;
