import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, updateEmployee, deleteEmployee } from '../FirebaseServices';

const EmployeeList = () => {
  const [employees, setEmployees] = useState({});
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

  const handleDelete = (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(empId)
        .then(() => {
          const updatedEmployees = { ...employees };
          delete updatedEmployees[empId];
          setEmployees(updatedEmployees);
        })
        .catch((error) => {
          console.error("Error deleting employee: ", error);
        });
    }
  };

  const handleEdit = (empId) => {
    setEditEmployeeId(empId);
    setEditData({ ...employees[empId] });
    setIsEditing(true);
  };

  const handleSave = (empId) => {
    updateEmployee(empId, editData)
      .then(() => {
        const updatedEmployees = { ...employees, [empId]: editData };
        setEmployees(updatedEmployees);
        setIsEditing(false);
        setEditEmployeeId(null);
      })
      .catch((error) => {
        console.error("Error updating employee: ", error);
      });
  };

  const handleCancel = () => {
    setEditEmployeeId(null);
    setIsEditing(false);
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handlePunchRecordChange = (weekday, value) => {
    setEditData((prevState) => ({
      ...prevState,
      punch_records: {
        ...prevState.punch_records,
        [weekday]: {
          ...prevState.punch_records[weekday], // Keep existing data for the weekday
          punch_in: value,
        },
      },
    }));
  };

  const navigateBack = useNavigate();

  // Define the weekdays in order
  const weekdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

  return (
    <>
      <p className="text-start text-light display-6 position-relative">
        Empl<u>oyee Li</u>st
      </p>

      {Object.keys(employees).length > 0 ? (
        <table className="table table-hover text-center">
          <thead className="fs-4 border-bottom border-light">
            <tr className='custom-table-bg text-light'>
              <th className='custom-table-bg text-light'>#</th>
              <th className='custom-table-bg text-light'>Name</th>
              <th className='custom-table-bg text-light'>Role</th>
              <th className='custom-table-bg text-light'>Phone</th>
              <th className='custom-table-bg text-light'>Email</th>
              <th className='custom-table-bg text-light'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(employees).map((empId) => (
              <React.Fragment key={empId}>
                <tr className="fw-bolder">
                  <td className="custom-table-bg text-light border-0 border-end border-light">{empId}</td>
                  <td className="custom-table-bg text-light border-0 border-end border-light">
                    {editEmployeeId === empId ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                      />
                    ) : (
                      employees[empId].name
                    )}
                  </td>
                  <td className="custom-table-bg text-light border-0 border-end border-light">
                    {editEmployeeId === empId ? (
                      <input
                        type="text"
                        value={editData.role}
                        onChange={(e) => handleInputChange(e, 'role')}
                      />
                    ) : (
                      employees[empId].role
                    )}
                  </td>
                  <td className="custom-table-bg text-light border-0 border-end border-light">
                    {editEmployeeId === empId ? (
                      <input
                        type="text"
                        value={editData.phone}
                        onChange={(e) => handleInputChange(e, 'phone')}
                      />
                    ) : (
                      employees[empId].phone
                    )}
                  </td>
                  <td className="custom-table-bg text-light border-0 border-end border-light">
                    {editEmployeeId === empId ? (
                      <input
                        type="text"
                        value={editData.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                      />
                    ) : (
                      employees[empId].email
                    )}
                  </td>
                  <td className="d-flex border-0 justify-content-evenly custom-table-bg text-light">
                    {editEmployeeId === empId ? (
                      <>
                        <button
                          className="btn btn-outline-success btn-sm mx-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Save changes"
                          onClick={() => handleSave(empId)}
                        >
                          <i className="fs-5 bi bi-check"></i>
                        </button>
                        <button
                          className="btn btn-outline-light btn-sm mx-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Cancel editing"
                          onClick={handleCancel}
                        >
                          <i className="fs-5 bi bi-x"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-warning btn-sm mx-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit"
                          onClick={() => handleEdit(empId)}
                        >
                          <i className="fs-5 bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm mx-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete"
                          onClick={() => handleDelete(empId)}
                        >
                          <i className="fs-5 bi bi-trash"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr className="border-bottom border-light">
                  <td colSpan="6" className='custom-table-bg text-light'>
                    <div className="d-flex justify-content-evenly flex-wrap">
                      {weekdays.map((weekday) => {
                        const record = employees[empId].punch_records[weekday.toLowerCase()]; // Get punch record using lowercase weekday
                        const punchInTime = record?.punch_in || '00:00';

                        let bgColorClass = '';
                        if (punchInTime === '00:00') {
                          bgColorClass = 'btn btn-outline-secondary';
                        } else if (punchInTime >= '09:30') {
                          bgColorClass = 'btn btn-outline-danger';
                        } else if (punchInTime >= '09:15' || punchInTime === '09:06') {
                          bgColorClass = 'btn btn-outline-warning';
                        } else {
                          bgColorClass = 'btn btn-outline-success';
                        }

                        return (
                          <div key={weekday}>
                            {editEmployeeId === empId ? (
                              <input
                                type="time"
                                value={editData.punch_records[weekday.toLowerCase()]?.punch_in || punchInTime}
                                onChange={(e) =>
                                  handlePunchRecordChange(weekday.toLowerCase(), e.target.value)
                                }
                                className="mx-2 p-2 fw-bolder rounded"
                              />
                            ) : (
                              <button
                                className={`mx-2 p-2 fw-bolder rounded ${bgColorClass}`}
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title={weekday.slice(0, 3)} // Use the weekday directly from the fetched data
                              >
                                {punchInTime}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No employees available.</p>
      )}
    </>
  );
};

export default EmployeeList;
