import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { logoutUser } from '../FirebaseServices'; // Import the logoutUser function

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser(); // Call the logoutUser function
            alert("Logged out successfully!"); // Notify the user about successful logout
            navigate('/'); // Navigate to the home or login page after logout
        } catch (error) {
            alert("Error logging out: " + error.message); // Handle any error during logout
        }
    };

    return (
        <div className='container-fluid'>
            <div className="row">
                {/* Sidebar Section */}
                <div className="col-2 position-fixed vh-100 d-flex flex-column" style={{ top: 0, left: 0,backgroundColor:'rgba(0,0,0,0.9)' }}>
                    <div className="my-2">
                        <div
                            className="text-light text-center bg-info py-2 mb-5"
                            style={{ cursor: 'pointer' }}
                            // onClick={() => navigate('createEmployee')}
                        >
                            <p className='fw-bolder fs-5 mb-0'>Logo</p>
                        </div>
                        {/* Add Employee */}
                        <div
                            className="text-light text-center boxclr py-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/admin')}
                        >
                            <p className='fw-bolder fs-5 mb-0'>Add  <i className="bi bi-plus-lg"></i></p>
                        </div>
                        {/* Employee List */}
                        <div
                            className="text-light text-center boxclr py-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('employeeData')}
                        >
                            <p className='fw-bolder fs-5 mb-0'>Employee  <i className="bi bi-clipboard2-data"></i></p>
                        </div>
                        {/* Weekly Report */}
                        <div
                            className="text-light text-center boxclr py-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('report')}
                        >
                            <p className='fw-bolder fs-5 mb-0'>Report  <i className="bi bi-download"></i></p>
                        </div>

                        <div
                            className="text-light text-center bg-danger py-1 rounded-5 mt-5"
                            style={{ cursor: 'pointer' }}
                            onClick={handleLogout} // Call handleLogout on click
                        >
                            <p className='fw-bolder fs-5 mb-0'>Logout  <i className="bi bi-box-arrow-right"></i></p>
                        </div>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="col offset-2" style={{ paddingTop: '20px' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
