import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, updateEmployeePunchIn } from './FirebaseServices'; // Import functions from FirebaseServices
import { getDatabase, ref, get } from "firebase/database"; // Import Firebase database functions

const EmployeePunch = () => {
    const navigate = useNavigate(); // Use a single navigate function
    const [employeeId, setEmployeeId] = useState(''); // To store input employee ID
    const [employeeData, setEmployeeData] = useState(null); // To store fetched employee data
    const [error, setError] = useState(''); // To handle errors if employee ID is not found
    const [showBox, setShowBox] = useState(false); // To toggle the visibility of the box

    // Logout function
    const handleLogout = async () => {
        try {
            await logoutUser(); // Call the logoutUser function
            alert("Logged out successfully!"); // Notify the user about successful logout
            navigate('/'); // Navigate to the home or login page after logout
        } catch (error) {
            alert("Error logging out: " + error.message); // Handle any error during logout
        }
    };

    // Function to handle form submission
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        const db = getDatabase(); // Get reference to Firebase Realtime Database
        const empRef = ref(db, `employees/${employeeId}`); // Reference to the employee ID path

        try {
            const snapshot = await get(empRef); // Fetch the data
            if (snapshot.exists()) {
                setEmployeeData(snapshot.val()); // Set the employee data
                setError(''); // Clear any previous error
            } else {
                setEmployeeData(null); // Clear any previous data
                setError(`No data found for Employee ID: ${employeeId}`); // Set error if no data is found
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while fetching the data.");
        }
    };

    // Function to log current time and update only the current day's punch-in time in the database
    const logCurrentDateTime = async () => {
      const currentDateTime = new Date(); // Get current date and time
      // Convert the time to hh:mm format using toLocaleTimeString
      const time = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const currentDayOfWeek = currentDateTime.toLocaleDateString(undefined, { weekday: 'long' }); // get week
        const dayweek=currentDayOfWeek.toLowerCase(); // Convert weekday to lowercase for consistency
        console.log(dayweek);

        if (employeeId && employeeData) {
            try {
                // Call the function to update the employee's punch records in the database
                await updateEmployeePunchIn(employeeId, dayweek, time);
                alert(`Punch-in time updated for ${currentDayOfWeek} for Employee ID: ${employeeId}`);
                window.location.reload();
            } catch (error) {
                console.error("Error updating punch-in data:", error);
                alert("Failed to update punch-in data.");
            }
        } else {
            alert("Please ensure you have searched for a valid Employee ID.");
        }
    };

    // Toggle function to show or hide the floating box
    const toggleBox = () => {
        setShowBox(!showBox); // Toggle the state of showBox
    };

    return (
        <>
            <p className='text-center text-light pt-1 display-6'> <u>VeloMark : Employee Punch Sheet</u> </p>

            {/* Toggle Button */}
            <button 
                onClick={toggleBox} 
                style={{position:'absolute',top:'0%',right:'0%',backgroundColor:'transparent'}} 
                className='m-1 me-0 border-0 rounded-5' 
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Settings">
              <i className='bi bi-gear-wide-connected fs-1 text-light p-1 rounded-5'></i>
              </button>
            

            {/* Conditionally render the floating box with Admin and Logout buttons */}
            {showBox && (
                <div className="floating-box px-2 py-3"> {/* Apply the CSS class for styling the box */}
                    <button className='btn btn-outline-success' onClick={() => navigate('/admin')}>Admin <i class="bi bi-person"></i></button>
                    <br /><br />
                    <button className='btn btn-outline-danger' onClick={handleLogout}>Logout <i class="bi bi-box-arrow-right"></i></button>
                </div>
            )}
            

            {/* Search form for employee ID */}
            <form onSubmit={handleSearch} 
              className='position-relative text-center rounded-5 mt-5 py-3'
              style={{width:'450px',left:'50%',transform:'translate(-50%,30%)',display:'flex',justifyContent:'space-evenly',backgroundColor:'rgba(0,0,0,0.3)'}}>
                <input 
                    type="text" 
                    placeholder='Employee ID'
                    value={employeeId} 
                    onChange={(e) => setEmployeeId(e.target.value)} // Handle input changes
                    required
                    className='text-center fw-border border-0 rounded-5 px-5 py-2'
                />
                <button type="submit" className='btn btn-outline-light fw-bolder'>Search <i className='bi bi-search'></i></button>
            </form>

            {/* Display employee data if found */}
            {employeeData && (
                <div className='border mt-5 border-0 position-relative px-5 py-3 rounded-5'
                    style={{width:'clamp(500px, 50vw, 900px)',left:'50%',transform:'translate(-50%)',backgroundColor:'rgba(0,0,0,0.5)',boxShadow:'0px 0px 20px white'}}
                >
                    {/* <p className='fs-4 fw-bolder'>Empl<u>oyee Det</u>ails:</p> */}
                    <p className='fs-3 d-flex justify-content-between'> 
                        <u style={{textDecorationColor:'#198754'}}> <b className='fw-bolder display-5 text-info'>{employeeData.name} </b> </u>
                        <b className='text-secondary fs-5'>{employeeId.toUpperCase()}</b>  
                    </p>
                    <p className='fs-4 fw-bolder text-info'><i className='text-light pe-3 bi bi-envelope-at-fill fs-5'></i> {employeeData.email}</p>
                    <p className='fs-4 fw-bolder text-info'><i className='text-light pe-3 bi bi-telephone-fill fs-5'></i> {employeeData.phone}</p>
                    <p className='fs-4 fw-bolder text-info'><i className='text-light pe-3 bi bi-person-fill fs-5'></i>  {employeeData.role}</p>
                    {/* Add other fields as necessary */}
                    <br />
                    
                        <button className='btn btn-outline-info fw-bolder position-absolute' style={{left:'50%',transform:'translate(-50%)'}} onClick={logCurrentDateTime}>
                            Punch Time <i class="bi bi-clock"></i>
                        </button>

                        <button onClick={() => navigate(-1)} 
                          className='btn btn-outline-light px-3 fw-bolder position-relative'
                          style={{left:'95%'}}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="back">
                          <i className='bi bi-arrow-left'></i>
                        </button>
                    
                </div>
            )}

            

            {/* Display error message if no data is found */}
            {error && <p className='fw-bolder' style={{left:'50%',transform:'translateX(-50%)',top:'32%',color:'red',position:'absolute'}}>{error}</p>}
        </>
    );
};

export default EmployeePunch;
