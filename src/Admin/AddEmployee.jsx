import React, { useState } from 'react';
import { addEmployeeToDB } from '../FirebaseServices'; // Import the Firebase function to add employee
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    punch_records: {
      monday: { punch_in: '00:00' },
      tuesday: { punch_in: '00:00' },
      wednesday: { punch_in: '00:00' },
      thursday: { punch_in: '00:00' },
      friday: { punch_in: '00:00' },
      saturday: { punch_in: '09:00' },
      sunday: { punch_in: '09:00' },
    },
  });

  // Handle input changes for employee details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add the employee to the database using the Firebase service
    await addEmployeeToDB(employee);
  };

  return (
    <div className="container">
      <p className="text-start text-light display-6 position-relative">
        <u>Add Emp</u>loyee
      </p>


      <form class="px-5 mx-5 position-absolute" style={{top:'50%',left:'50%',transform:'translate(-50%, -50%)',width:'clamp(550px, 50vw, 800px)'}} onSubmit={handleSubmit}>
        <div className='row border-0 mx-5 py-3' style={{backgroundColor:'rgba(0,0,0,0.6)'}}>
      <div class="mt-3 col-12">
        <label for="name" class="form-label text-light fs-6">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Jhnon, Rockey ,etc" name="name"
        value={employee.name}
        onChange={handleInputChange}
        required  />
      </div>
      <div class="mt-3 col-12">
        <label for="role" class="form-label text-light fs-6">Role</label>
        <input type="text" class="form-control" id="role" placeholder="Developer, Designer, etc" value={employee.role} name="role"
        onChange={handleInputChange}
        required  />
      </div>      <br />
      <div class="mt-3 col-md-6">
        <label for="inputEmail4" class="form-label text-light fs-6">Email</label>
        <input type="email" class="form-control" id="inputEmail4" placeholder="Jhnony@gmail.com, etc"
        value={employee.email} name="email"
        onChange={handleInputChange}
        required  />
      </div>
      <div class="mt-3 col-md-6">
        <label for="phone" class="form-label text-light fs-6">Phone No.</label>
        <input type="tel" class="form-control" id="phone" placeholder="+91 9865736489" name="phone"
        value={employee.phone}
        onChange={handleInputChange}
        required  />
      </div>
      <div class="col-5 mt-5" style={{}}>
        <button type="submit" class="btn btn-outline-warning px-3">Add <i className='bi bi-plus'></i> </button>
      </div>
      </div>
    </form>


    </div>
  );
};

export default AddEmployee;
