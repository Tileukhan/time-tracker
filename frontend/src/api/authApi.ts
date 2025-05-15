import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Бэкенд локально

export const login = async (iin: string) => {
  const response = await axios.post(`${API_URL}/login`, { iin });
  return response.data;
};
