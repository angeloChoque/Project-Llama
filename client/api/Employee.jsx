import axios from "axios";


export const getEmployeeRequest = async() => await axios.get('http://localhost:5000/employees')
export const createEmployeeRequest = async(Employee)=> await axios.post("http://localhost:5000/employees",Employee)