import { database } from './Firebase';
import { ref, set, get, update ,remove } from 'firebase/database';


// Function to get all employees
export const getEmployees = async () => {
    const employeeRef = ref(database, 'employees');  // Create a reference to 'employees'
    const snapshot = await get(employeeRef);  // Fetch the data from Firebase

    return snapshot.exists() ? snapshot.val() : {};  // Return data if exists, otherwise return empty object
};


// Function to DELETE specific clicked employee data from the database
export const deleteEmployee = (id) => {
    const delRef = ref(database, 'employees/' + id);
    return remove(delRef) // Ensure the function returns this promise
        .then(() => {
            alert("Successfully Deleted");
        })
        .catch((error) => {
            console.log(error);
        });
};


// Function to update employee data, including punch_in records for a specific date
export const updateEmployee = async (empId, updatedData, punchDate = null, punchInTime = null) => {
    const employeeRef = ref(database, `employees/${empId}`); // Reference to the specific employee in Firebase
  
    try {
      const updates = { ...updatedData }; // Copy employee details to be updated
  
      // If punchDate and punchInTime are provided, update the punch_in record for that specific date
      if (punchDate && punchInTime) {
        updates[`punch_records/${punchDate}/punch_in`] = punchInTime; // Set punch_in time for the specific date
      }
  
      // Perform the update operation in Firebase
      await update(employeeRef, updates);
  
      console.log('Employee and punch-in records updated successfully.');
    } catch (error) {
      console.error('Error updating employee or punch records: ', error);
      throw error; // Propagate the error to handle it in the calling component
    }
  };