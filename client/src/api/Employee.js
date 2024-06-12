import axios from "axios";
import { config } from "../env";

const baseUrl = config.API_URL+"/employees";

export const getEmployeesRequest = () => axios.get(`${baseUrl}`);

export const createEmployeeRequest = (Employee) =>
  axios.post(`${baseUrl}`, Employee);

export const deleteEmployeeRequest = (id) => axios.delete(`${baseUrl}/${id}`);

export const getEmployeeRequest = (id) => axios.get(`${baseUrl}/${id}`);

export const updateEmployeeRequest = (id, newfields) =>
  axios.put(`${baseUrl}/${id}`, newfields);
