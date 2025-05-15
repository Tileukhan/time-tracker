import axios from "axios";

const API_URL = "http://localhost:5000/api/manager";

export const getAbsences = async (params: {
  status?: string;
  startDate?: string;
  endDate?: string;
  iin?: string;
}) => {
  const response = await axios.get(`${API_URL}/absences`, { params });
  return response.data;
};

export const updateAbsenceStatus = async (id: string, status: string) => {
  return await axios.patch(`${API_URL}/absences/${id}`, { status });
};

export const exportWorkTimes = async (params: {
  startDate?: string;
  endDate?: string;
  iin?: string;
}) => {
  const response = await axios.get(`${API_URL}/export`, {
    params,
    responseType: "blob",
  });
  return response.data;
};
export const getWorkTimes = async (params: {
  startDate?: string;
  endDate?: string;
  iin?: string;
}) => {
  const response = await axios.get(
    `http://localhost:5000/api/manager/worktimes`,
    { params }
  );
  return response.data;
};
