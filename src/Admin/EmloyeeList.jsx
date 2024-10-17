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

  const handlePunchRecordChange = (date, value) => {
    setEditData((prevState) => ({
      ...prevState,
      punch_records: {
        ...prevState.punch_records,
        [date]: {
          ...prevState.punch_records[date],
          punch_in: value,
        },
      },
    }));
  };

  const navigateBack = useNavigate();

  return (
    <>
      {Object.keys(employees).length > 0 ? (
        <table className="table table-hover text-center">
          <thead className="thead-dark fs-4 border-0">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(employees).map((empId) => (
              <React.Fragment key={empId}>
                <tr className="fw-bolder">
                  <td className="border-0 border-end border-dark">{empId}</td>
                  <td className="border-0 border-end border-dark">
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
                  <td className="border-0 border-end border-dark">
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
                  <td className="border-0 border-end border-dark">
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
                  <td className="border-0 border-end border-dark">
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
                  <td className="d-flex justify-content-evenly">
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
                          className="btn btn-outline-dark btn-sm mx-2"
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
                <tr className="border-0">
                  <td colSpan="6">
                    <div className="d-flex justify-content-evenly flex-wrap">
                      {employees[empId].punch_records &&
                        Object.keys(employees[empId].punch_records).map((date) => {
                          const punchInTime = employees[empId].punch_records[date].punch_in;
                          const weekday = employees[empId].punch_records[date].weekday.substring(0, 3).toUpperCase();

                          let bgColorClass = '';
                          if (punchInTime >= '09:30') {
                            bgColorClass = 'btn btn-outline-danger';
                          } else if (punchInTime >= '09:15' || punchInTime === '09:06') {
                            bgColorClass = 'btn btn-outline-warning';
                          } else {
                            bgColorClass = 'btn btn-outline-success';
                          }

                          return (
                            <div key={date}>
                              {editEmployeeId === empId ? (
                                <input
                                  type="time"
                                  value={editData.punch_records[date]?.punch_in || punchInTime}
                                  onChange={(e) =>
                                    handlePunchRecordChange(date, e.target.value)
                                  }
                                  className="mx-2 p-2 fw-bolder rounded"
                                />
                              ) : (
                                <button
                                  className={`mx-2 p-2 fw-bolder rounded ${bgColorClass}`}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="right"
                                  title={weekday}
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

      <h1>View, Edit or Delete</h1>
      <button onClick={() => navigateBack(-1)}>Back to Dashboard</button>
    </>
  );
};

export default EmployeeList;
