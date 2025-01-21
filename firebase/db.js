import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// Fetch all users from the 'users' collection
export const fetchAllUsers = async () => {
  try {
    const usersRef = collection(db, "users"); // Reference to the 'users' collection
    const querySnapshot = await getDocs(usersRef); // Fetch documents
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));
    // console.log(`Fetched users: ${JSON.stringify(users, null, 2)}`);
    return users; // Return users array
  } catch (error) {
    console.error("Error fetching users: ", error);
    return []; // Return empty array on error
  }
};

// Fetch all appointments from the 'appointments' collection
export const fetchAllAppointments = async () => {
  try {
    const appointmentsRef = collection(db, "appointments"); // Reference to the 'appointments' collection
    const querySnapshot = await getDocs(appointmentsRef); // Fetch documents
    const appointments = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));
    //console.log(`Fetched appointments: ${JSON.stringify(appointments, null, 2)}`);
    return appointments; // Return appointments array
  } catch (error) {
    console.error("Error fetching appointments: ", error);
    return []; // Return empty array on error
  }
};
