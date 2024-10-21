import React, { useEffect, useState, useRef } from 'react';
import { getEmployees } from '../FirebaseServices';
import html2pdf from 'html2pdf.js';

const WeeklyReport = () => {
  const [employees, setEmployees] = useState({});
  const reportRef = useRef(); // Reference for the report section

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

  // Define the weekdays in order
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  // Function to determine the color class based on punch-in time
  const getColorClass = (punchInTime) => {
    if (punchInTime === '00:00') {
      return 'text-light'; // No punch-in
    } else if (punchInTime >= '09:30') {
      return 'text-danger'; // Late punch-in
    } else if (punchInTime >= '09:15' || punchInTime === '09:06') {
      return 'text-warning'; // Slightly late punch-in
    } else {
      return 'text-success'; // On time
    }
  };

  // Function to download the report as a PDF
  const downloadPDF = () => {
    const element = reportRef.current;
    const opt = {
      margin: 1,
      filename: 'Weekly_attendance_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save();
  };

  return (
    <>
      <p className="text-start text-light display-6 position-relative">
        Wee<u>kly Repo</u>rt
      </p>

      <div ref={reportRef}>
        {Object.keys(employees).length > 0 ? (
          <table className="table table-hover text-center table">
            <thead className="thead-dark fs-4 border-bottom border-light">
              <tr>
                <th className='fs-6 custom-reporttable-bg'> </th>
                {weekdays.map((day) => (
                  <th className='custom-reporttable-bg fs-5 text-light' key={day}>{day.slice(0,3).toUpperCase()}</th> // Capitalize first letter
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(employees).map((empId) => (
                <tr key={empId}>
                  <td className='fw-bolder custom-reporttable-bg text-light'>{employees[empId].name}</td>
                  {weekdays.map((weekday) => {
                    const punchInTime = employees[empId].punch_records[weekday]?.punch_in || '00:00';
                    return (
                      <td key={weekday} className='custom-reporttable-bg'>
                        <span className={`p-2 fw-bolder rounded ${getColorClass(punchInTime)}`}>
                          {punchInTime}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No employees available.</p>
        )}
      </div>

      <div className="text-end mt-2">
        <button className="px-5 btn btn-outline-light" onClick={downloadPDF}>
          PDF <i className='bi bi-download'></i>
        </button>
      </div>
    </>
  );
};

export default WeeklyReport;
