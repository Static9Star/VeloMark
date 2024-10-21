import { database } from './Firebase';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, get, update, remove } from 'firebase/database';

// Function to get the highest existing employee ID (if needed)
const getNextEmployeeId = async () => {
  try {
    const employeeRef = ref(database, 'employees');
    const snapshot = await get(employeeRef);

    if (snapshot.exists()) {
      const employees = snapshot.val();
      const employeeIds = Object.keys(employees); // Get all employee keys

      const numericIds = employeeIds
        .map(id => parseInt(id.replace('emp', ''), 10))
        .filter(num => !isNaN(num));

      const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

      return `emp${maxId + 1}`; // Return the next employee ID
    } else {
      return 'emp1'; // Start with emp1 if no employees exist
    }
  } catch (error) {
    console.error('Error fetching employee IDs: ', error);
    return 'emp1'; // Handle errors and start with emp1
  }
};

// Function to add a new employee
export const addEmployeeToDB = async (employee) => {
  try {
    const nextEmpId = await getNextEmployeeId(); // Get the next employee ID
    employee.eid = nextEmpId; // Assign the generated ID to the employee data

    await set(ref(database, `employees/${nextEmpId}`), employee);
    alert('Employee added successfully');
  } catch (error) {
    console.error('Error adding employee: ', error);
  }
};

// Function to get all employees
export const getEmployees = async () => {
  const employeeRef = ref(database, 'employees');
  const snapshot = await get(employeeRef);

  return snapshot.exists() ? snapshot.val() : {};
};

// Function to delete an employee
export const deleteEmployee = (id) => {
  const delRef = ref(database, 'employees/' + id);
  return remove(delRef)
    .then(() => alert("Successfully Deleted"))
    .catch((error) => console.log(error));
};

// **Function to update employee information without punch-in logic**
export const updateEmployee = async (empId, updatedData) => {
  const employeeRef = ref(database, `employees/${empId}`);

  try {
    await update(employeeRef, updatedData);
    alert('Employee updated successfully.');
  } catch (error) {
    console.error('Error updating employee: ', error);
    throw error;
  }
};
 
// **Function to update punch-in records based on weekday**
export const updateEmployeePunchIn = async (empId, weekday, time) => {
  const employeeRef = ref(database, `employees/${empId}`); // Reference to the employee in the database

  try {
    // Fetch the employee data from the database
    const snapshot = await get(employeeRef);
    
    if (!snapshot.exists()) {
      throw new Error('Employee does not exist.');
    }

    // Get the employee data and current punch records (if any)
    const employeeData = snapshot.val();
    const punchRecords = employeeData.punch_records || {};

    // Update punch_in for the specific weekday
    punchRecords[weekday] = { punch_in: time };

    // Update the employee's punch records in the database
    await update(employeeRef, { punch_records: punchRecords });

    // Notify the user about the successful update
    alert(`Punch-in time updated successfully for ${weekday}.`);

  } catch (error) {
    // Log the error and provide feedback to the user
    console.error('Error updating punch-in time:', error);
    alert(`Failed to update punch-in data: ${error.message}`);
  }
};


// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in:", user);
    return user;
  } catch (error) {
    console.error('Error signing in: ', error);
    throw error;
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error('Error signing out: ', error);
    throw error;
  }
};