import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { logoutUser } from '../FirebaseServices'; // Import the logoutUser function
import logo from '../logo.png';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location (URL path)

    const handleLogout = async () => {
        try {
            await logoutUser(); // Call the logoutUser function
            alert("Logged out successfully!"); // Notify the user about successful logout
            navigate('/'); // Navigate to the home or login page after logout
        } catch (error) {
            alert("Error logging out: " + error.message); // Handle any error during logout
        }
    };

    // Helper function to check if the current path matches the route
    const isActiveRoute = (path) => location.pathname === path;

    return (
        <div className='container-fluid'>
            <div className="row">
                {/* Sidebar Section */}
                <div className="col-2 position-fixed vh-100 d-flex flex-column" style={{ top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.9)' }}>
                    <div className="my-2">
                        <div className="text-light mb-5" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                            <img src={logo} className='position-relative p-0' style={{ width: '195px', height: '100px' }} />
                        </div>

                        {/* Admin Name */}
                        <div className="text-light text-center fs-3 p-0 mb-5" style={{ cursor: 'crosshair' }}>
                            <u>Hii</u> , Admin
                        </div>

                        {/* Add Employee */}
                        <div
                            className={`text-light text-center boxclr py-3 ${isActiveRoute('/admin') ? 'now' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/admin')}
                        >
                            <p className='fw-bolder fs-5 mb-0'>Add <i className="bi bi-plus-lg"></i></p>
                        </div>

                        {/* Employee List */}
                        <div
                            className={`text-light text-center boxclr py-3 ${isActiveRoute('/admin/employeeData') ? 'now' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/admin/employeeData')}
                        >
                            <p className='fw-bolder fs-5 mb-0'>Employee <i className="bi bi-clipboard2-data"></i></p>
                        </div>

                        {/* Weekly Report */}
                        <div
                            className={`text-light text-center boxclr py-3 ${isActiveRoute('/admin/report') ? 'now' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/admin/report')}
                        >
                            <p className='fw-bolder fs-5 mb-0'>Report <i className="bi bi-download"></i></p>
                        </div>

                        <i class="bi bi-escape text-center position-absolute mt-5 text-danger fs-2 rounded-5 border-0"
                            style={{ cursor: 'pointer',left:'50%',transform:'translate(-50%)'}}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Logout"  
                            onClick={handleLogout}>     </i>
                        
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
