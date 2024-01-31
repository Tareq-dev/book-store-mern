// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const storeUserData = async (uid, username, email) => {
  try {
    await axios.post(`${API_BASE_URL}/storeUserData`, { uid, username, email });
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

export const checkUserExistence = async (uid) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/checkUserExistence`, {
      uid,
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};
export const updateUserRole = async (uid, newRole) => {
  try {
    await axios.post(`${API_BASE_URL}/updateUserRole`, { uid, newRole });
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};