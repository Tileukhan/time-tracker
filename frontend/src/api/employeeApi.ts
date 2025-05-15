import axios from "axios";

const API_URL = "http://localhost:5000/api/employee";

export const submitWorkTime = async (data: {
  employeeIIN: string;
  date: string;
  startTime: string;
  endTime: string;
}) => {
  return await axios.post(`${API_URL}/worktime`, data);
};

export const submitAbsence = async (formData: FormData) => {
  return await axios.post(`${API_URL}/absence`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getMyAbsences = async (iin: string) => {
  const response = await axios.get(
    `http://localhost:5000/api/employee/my-absences`,
    {
      params: { iin },
    }
  );
  return response.data;
};
