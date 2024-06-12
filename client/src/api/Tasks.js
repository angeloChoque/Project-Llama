import axios from "axios";
import { config } from "../env";

const baseUrl = config.API_URL+"/tasks";

export const getTasksRequest = () => axios.get(`${baseUrl}`);

export const createTaskRequest = (Task) => axios.post(`${baseUrl}`, Task);

export const deleteTaskRequest = (id) => axios.delete(`${baseUrl}/${id}`);

export const getTaskRequest = (id) => axios.get(`${baseUrl}/${id}`);

export const updateTaskRequest = (id, newfields) =>
  axios.put(`${baseUrl}/${id}`, newfields);

export const getNameEmployeeRequest = (employees) => 
  axios.get(`${baseUrl}/${employees}`);

export const getTasksByEmployee = (employeeId) =>
  axios.get(`${baseUrl}/employees/${employeeId}`);
